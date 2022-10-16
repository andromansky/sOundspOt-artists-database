/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Dragger.css';
import DraggerModal from './DraggerModal';
import { changeUserCoord } from '../../storeAndSlices/Slices/authReducer';

function Dragger({ user }) {
  const dispatch = useDispatch();
  const [geolocation, setGeolocation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dropcase, setDropcase] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [draggerStart, setDraggerStart] = useState(true);

  useEffect(() => {
    if (dropcase) {
      setShowModal(true);
      setDropcase(false);
    }
  }, [dropcase]);

  const initDragger = () => {
    if (!rendered) {
      jQuery(() => {
        ymaps.ready(init);
        setRendered(true);
      });
    }
  };

  const handleSettingCoord = () => {
    setShowModal(false);
    dispatch(changeUserCoord({ geolocation }));
  };

  function init() {
    const map = new ymaps.Map('map', {
      center: [user.latitude, user.longitude],
      zoom: 10
    }, {
      searchControlProvider: 'yandex#search'
    });
    const markerElement = jQuery('#marker');
    const dragger = new ymaps.util.Dragger({
      // Dragger will automatically run when the user clicks on the 'marker' element.
      autoStartElement: markerElement[0]
    });
    // The offset of the marker relative to the cursor.
    let markerOffset;
    let markerPosition;

    dragger.events
      .add('start', onDraggerStart)
      .add('move', onDraggerMove)
      .add('stop', onDraggerEnd);

    function onDraggerStart(event) {
      setDraggerStart(false);
      const offset = markerElement.offset();
      const position = event.get('position');
      // Saving the offset of the marker relative to the drag starting point.
      markerOffset = [
        position[0] - offset.left,
        position[1] - offset.top
      ];
      markerPosition = [
        position[0] - markerOffset[0],
        position[1] - markerOffset[1]
      ];

      applyMarkerPosition();
    }

    function onDraggerMove(event) {
      applyDelta(event);
    }

    function onDraggerEnd(event) {
      applyDelta(event);
      markerPosition[0] += markerOffset[0];
      markerPosition[1] += markerOffset[1];
      // Converting page coordinates to global pixel coordinates.
      const markerGlobalPosition = map.converter.pageToGlobal(markerPosition);
      // Getting the center of the map in global pixel coordinates.
      const mapGlobalPixelCenter = map.getGlobalPixelCenter();
      // Getting the size of the map container on the page.
      const mapContainerSize = map.container.getSize();
      const mapContainerHalfSize = [mapContainerSize[0] / 2, mapContainerSize[1] / 2];
      // Calculating the map boundaries in global pixel coordinates.
      const mapGlobalPixelBounds = [
        [mapGlobalPixelCenter[0] - mapContainerHalfSize[0], mapGlobalPixelCenter[1] - mapContainerHalfSize[1]],
        [mapGlobalPixelCenter[0] + mapContainerHalfSize[0], mapGlobalPixelCenter[1] + mapContainerHalfSize[1]]
      ];
      // Checking that the dragger finished working in a visible area of the map.
      if (containsPoint(mapGlobalPixelBounds, markerGlobalPosition)) {
        // Now we'll convert the global pixel coordinates to geocoordinates with the current zoom level of the map.
        const geoPosition = map.options.get('projection').fromGlobalPixels(markerGlobalPosition, map.getZoom());
        // console.log(geoPosition);
        setGeolocation(geoPosition);
        setDropcase(true);
        // alert(geoPosition.join(' '));
      }
    }

    function applyDelta(event) {
      // The 'delta' field contains the difference between the positions of the current and previous dragger events.
      const delta = event.get('delta');
      markerPosition[0] += delta[0];
      markerPosition[1] += delta[1];
      applyMarkerPosition();
    }

    function applyMarkerPosition() {
      const myDiv = document.querySelector('#map');
      const rect = myDiv.getBoundingClientRect();
      let margins = { left: markerPosition[0], top: markerPosition[1] };
      if (markerPosition[0] > rect.left && markerPosition[1] > rect.top
        && markerPosition[0] < (rect.right - 30) && markerPosition[1] < (rect.bottom - 40)) {
        markerElement.css(margins);
      }
      if (markerPosition[0] <= rect.left) {
        margins = {
          left: rect.left,
          top: markerPosition[1],
        };
      } else if (markerPosition[1] <= rect.top) {
        margins = {
          left: markerPosition[0],
          top: rect.top,
        };
      } else if (markerPosition[0] >= rect.right - 30) {
        margins = {
          left: rect.right - 30,
          top: markerPosition[1],
        };
      } else if (markerPosition[1] >= rect.bottom - 40) {
        margins = {
          left: markerPosition[0],
          top: rect.bottom - 40,
        };
      }
    }

    function containsPoint(bounds, point) {
      return point[0] >= bounds[0][0] && point[0] <= bounds[1][0]
                   && point[1] >= bounds[0][1] && point[1] <= bounds[1][1];
    }
  }

  return (
    <div className="soundSpot__dragger">
      {user && initDragger()}
      {user && (
      <>
        <div id="map" />
        <div id="marker" />
        {draggerStart && <span className="draggerText">Use dragger to set new location</span>}
      </>
      )}
      {showModal && <DraggerModal handleClose={() => setShowModal(false)} confirmCase={handleSettingCoord} />}
    </div>
  );
}

export default Dragger;
