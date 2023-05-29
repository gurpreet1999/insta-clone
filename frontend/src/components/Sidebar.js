import React from 'react'

const Sidebar = () => {
  return (
    <aside class="sidebar">
    <header class="sidebar-header">
      <img class="logo-img" src="logo.svg" />
      <i class="logo-icon uil uil-instagram"></i>
    </header>
    <nav>
    
      <button>
        <span>
          <i class="uil uil-estate"></i>
          <span>Home</span>
        </span>
      </button>
    
      <button>
        <span>
          <i class="uil uil-search"></i>
          <span>Search</span>
        </span>
      </button>
    
      <button>
        <span>
          <i class="uil uil-compass"></i>
          <span>Explore</span>
        </span>
      </button>
    
      <button>
        <span>
          <i class="uil uil-location-arrow">
            <span>12</span>
          </i>
          <span>Messages</span>
        </span>
      </button>
    
      <button>
        <span>
          <i class="uil uil-heart">
            <em></em>
          </i>
          <span>Notifications</span>
        </span>
      </button>
    
      <button>
        <span>
          <i class="uil uil-plus-circle"> </i>
          <span>Create</span>
        </span>
      </button>
    
      <button>
        <span>
          <img src="Profile.svg" />
          <span>Profile</span>
        </span>
      </button>
    
      <button>
        <span>
          <i class="uil uil-bars"> </i>
          <span>More</span>
        </span>
      </button>
    </nav>
    </aside>
  )
}

export default Sidebar