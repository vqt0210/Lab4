import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import UserProfile from "./components/UserProfile"; // Import UserProfile component
import { useSwipeable } from "react-swipeable"; // Import thư viện react-swipeable

// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
    followers: 1000,
    following: 200,
    videos: [
      { url: require("./videos/video1.mp4") },
      { url: require("./videos/video2.mp4") },
    ],
  },
  {
    url: require("./videos/video2.mp4"),
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
    followers: 5000,
    following: 300,
    videos: [
      { url: require("./videos/video3.mp4") },
      { url: require("./videos/video4.mp4") },
    ],
  },
  {
    url: require("./videos/video3.mp4"),
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
    followers: 2000,
    following: 150,
    videos: [
      { url: require("./videos/video1.mp4") },
      { url: require("./videos/video2.mp4") },
    ],
  },
  {
    url: require("./videos/video4.mp4"),
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
    followers: 8000,
    following: 400,
    videos: [
      { url: require("./videos/video3.mp4") },
      { url: require("./videos/video4.mp4") },
    ],
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [profilePic, setProfilePic] = useState(
    "https://th.bing.com/th/id/OIP.Xw2rxMmQ9g2ZAFMjomWnHAAAAA?w=220&h=248&rs=1&pid=ImgDetMain"
  );
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // State for current video index
  const [showUserProfile, setShowUserProfile] = useState(false); // State to toggle user profile view

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  const handleAvatarUpdate = (newAvatar) => {
    setProfilePic(newAvatar); // Update the global avatar state
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  // Filter videos based on the search query
  const filteredVideos = videos.filter((video) =>
    video.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle keydown event to switch user profiles
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setShowUserProfile(true);
      } else if (event.key === 'ArrowLeft') {
        setShowUserProfile(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle swipe event to switch user profiles
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowUserProfile(true);
    },
    onSwipedRight: () => {
      setShowUserProfile(false);
    },
  });

  return (
    <div className="app" {...handlers}>
      <div className="container">
        <TopNavbar onSearch={handleSearch} className="top-navbar" />
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        {/* Toggle between video cards and user profile */}
        {showUserProfile ? (
          filteredVideos[currentVideoIndex] && (
            <UserProfile
              username={filteredVideos[currentVideoIndex].username}
              followers={filteredVideos[currentVideoIndex].followers || 0}
              following={filteredVideos[currentVideoIndex].following || 0}
              likes={filteredVideos[currentVideoIndex].likes}
              profilePic={filteredVideos[currentVideoIndex].profilePic}
              onFollow={() => console.log('Follow')}
              onMessage={() => console.log('Message')}
              contactInfo="Email: user@example.com"
              videos={filteredVideos[currentVideoIndex].videos || []}
            />
          )
        ) : (
          filteredVideos.map((video, index) => (
            <VideoCard
              key={index}
              username={video.username}
              description={video.description}
              song={video.song}
              likes={video.likes}
              saves={video.saves}
              comments={video.comments}
              shares={video.shares}
              url={video.url}
              profilePic={profilePic}
              setVideoRef={handleVideoRef(index)}
              autoplay={index === currentVideoIndex}
              onAvatarUpdate={handleAvatarUpdate}
              onVideoClick={() => setCurrentVideoIndex(index)} // Update current video index on click
            />
          ))
        )}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;

