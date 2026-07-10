import { useState } from 'react';
import { BiExitFullscreen } from 'react-icons/bi';
import { GoScreenFull } from 'react-icons/go';
import { RiBarChartHorizontalFill } from 'react-icons/ri';

export default function Header({ handleAsideOpen }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };
  return (
    <>
      <header className="header flex flex-sb">
        <div className="logo flex gap-2">
          <h1>ADMIN</h1>
          <div className="headerham flex flex-center" onClick={handleAsideOpen}>
            <RiBarChartHorizontalFill />
          </div>
        </div>

        <div className="rightnav flex gap-2">
          {/* Fullscreen or Exit Fullscreen */}
          <div onClick={toggleFullScreen}>{isFullscreen ? <BiExitFullscreen /> : <GoScreenFull />}</div>

          {/* Notification */}
          <div className="notification">
            <img src="/img/notification.png" alt="notification" />
          </div>

          {/* Profile */}
          <div className="profilenav">
            <img src="/img/user.png" alt="user" />
          </div>
        </div>
      </header>
    </>
  );
}
