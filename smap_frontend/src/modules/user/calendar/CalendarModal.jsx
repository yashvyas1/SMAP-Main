import React, { useState, useRef, useEffect } from "react";
import { MdCalendarToday } from "react-icons/md";
import { RiRobot3Line } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { CiCamera, CiHashtag, CiVideoOn } from "react-icons/ci";
import Picker from "emoji-picker-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoLocationOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { PiShareFatThin } from "react-icons/pi";
import {
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaCheck,
  FaChevronDown,
  FaExclamationTriangle,
  FaImages,
  FaRegComment,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import FacebookPreview from "./FacebookPreview";
import InstagramPreview from "./InstagramPreview";
import TwitterPreview from "./TwitterPreview";
import LinkedinPreview from "./LinkedinPreview";
import YoutubePreview from "./YoutubePreview";

const options = ["Share Now", "Share Next", "Scheduled Post"];

const platformColors = {
  facebook: "#3b5998",
  twitter: "#000000",
  instagram: "#E4405F",
  linkedin: "#0077b5",
  youtube: "#FF0000",
};

const platformIcons = {
  facebook: FaFacebook,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const fetchHashtagApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        "#love",
        "#instagood",
        "#photooftheday",
        "#fashion",
        "#beautiful",
        "#happy",
        "#cute",
        "#tbt",
        "#like4like",
        "#followme",
        "#picoftheday",
        "#follow",
        "#me",
        "#selfie",
        "#summer",
        "#art",
        "#instadaily",
        "#friends",
        "#repost",
        "#nature",
        "#life",
        "#comment",
        "#sports",
        "#football",
        "#car",
        "#cricket",
        "#music",
        "#office",
        "#style",
        "#mems",
        "#movie",
        "#phone",
      ]);
    }, 1000);
  });
};

const CalendarModal = () => {
  const [details, setDetails] = useState({
    caption: "",
    platforms: [],
    publishDate: new Date(),
    publishTime: new Date(),
    image: [],
    video: "",
    location: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);
  const [suggestedHashtags, setSuggestedHashtags] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [uploadFrom, setUploadFrom] = useState("computer");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [fetchedHashtags, setFetchedHashtags] = useState([]);
  const [activePreviewPlatform, setActivePreviewPlatform] = useState(null);
  const [showYoutubePopup, setShowYoutubePopup] = useState(false);
  const [postType, setPostType] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [hashtagCount, setHashtagCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Schedule");
  const [buttonWidth, setButtonWidth] = useState("w-24");
  const [isOn, setIsOn] = useState(false);
  const [autoPostSettings, setAutoPostSettings] = useState({
    days: [],
    time: new Date(),
  });
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const datePickerRef = useRef(null);
  const fileInputRef = useRef(null);
  const locationInputRef = useRef(null);
  const modalRef = useRef(null);
  const dropAreaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const imageIconRef = useRef(null);
  const hashtagInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { closeModal } = useModal();

  // Handle file drop for image/video upload
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload({ target: { files } });
    }
  };

  // Adjust button width based on selected option length
  useEffect(() => {
    if (selectedOption.length <= 8) {
      setButtonWidth("w-24");
    } else if (selectedOption.length <= 12) {
      setButtonWidth("w-32");
    } else {
      setButtonWidth("w-40");
    }
  }, [selectedOption]);

  // Add drag-and-drop event listeners for the drop area
  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const dropArea = dropAreaRef.current;
    if (dropArea) {
      dropArea.addEventListener("dragover", handleDragOver);
      dropArea.addEventListener("drop", handleDrop);
    }

    return () => {
      if (dropArea) {
        dropArea.removeEventListener("dragover", handleDragOver);
        dropArea.removeEventListener("drop", handleDrop);
      }
    };
  }, []);

  // Fetch hashtags from the API
  const fetchHashtags = async () => {
    const hashtags = await fetchHashtagApi();
    setFetchedHashtags(hashtags);
  };

  // Handle outside clicks for closing dropdowns or modals
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeComponent, dropdownRef, popupContent]);

  // Detect outside click to close modals or dropdowns
  const handleClickOutside = (event) => {
    if (popupContent === "Add Image" || popupContent === "Add Video") {
      return;
    }
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target)
    ) {
      setActiveComponent(null);
      setShowPopup(false);
      setIsOpen(false);
    } else if (
      activeComponent &&
      !document.getElementById(activeComponent)?.contains(event.target)
    ) {
      setActiveComponent(null);
      setShowPopup(false);
      setIsOpen(false);
    }
  };

  // Handle input changes for caption, hashtags, etc.
  const handleChange = (e) => {
    const { name, value } = e.target;

    const nonHashtagText = value.replace(/#[^\s]+/g, "").trim();
    const count = nonHashtagText.length;

    if (name === "caption" && count > 2500) {
      showToastOnce("You have reached the character limit of 2500.");
      return;
    }

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "caption") {
      setCharacterCount(count);

      const words = value.split(" ");
      const hashtags = words.filter((word) => word.startsWith("#"));

      setHashtagCount(hashtags.length);

      if (hashtags.length > 30) {
        showToastOnce("You have reached the hashtag limit of 30.");
        return;
      }

      const lastWord = words[words.length - 1];
      if (lastWord.includes("#")) {
        setActiveComponent("hashtags");
        fetchHashtags();
      } else {
        setActiveComponent(null);
      }
    }
  };

  // Handle emoji selection and append to the caption
  const handleEmojiSelect = (emojiObject) => {
    setDetails((prev) => ({
      ...prev,
      caption: prev.caption + emojiObject.emoji,
    }));
  };

  // Render the emoji picker component
  const renderEmojiPicker = () => {
    return (
      <div
        id="emoji"
        className="absolute z-50 shadow-lg rounded-lg bg-white p-2 border border-gray-200"
        ref={emojiPickerRef}
      >
        <Picker onEmojiClick={handleEmojiSelect} />
      </div>
    );
  };

  // Handle publish date change
  const handleDateChange = (date) => {
    if (!postType) {
      showToastOnce("Please select Post, Reels, or Video first.");
      return;
    }

    setDetails((prev) => ({
      ...prev,
      publishDate: date,
    }));
  };

  // Display toast notifications once to avoid spamming
  const showToastOnce = (message) => {
    if (!toastDisplayed) {
      toast.error(message);
      setToastDisplayed(true);

      setTimeout(() => {
        setToastDisplayed(false);
      }, 3000);
    }
  };

  // Handle platform selection for the post
  const handlePlatformSelect = (platform) => {
    if (!postType) {
      showToastOnce("Please select Post, Reels, or Video first.");
      return;
    }

    setDetails((prev) => {
      const platforms = prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform];
      return {
        ...prev,
        platforms,
      };
    });

    setSelectedPlatform((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );

    if (platform !== "youtube") {
      setShowYoutubePopup(false);
      setDetails((prev) => ({
        ...prev,
        platforms: prev.platforms.filter((p) => p !== "youtube"),
      }));
    } else if (platform === "youtube") {
      setShowYoutubePopup(!showYoutubePopup);
    }
  };

  // Handle preview selection for the active platform
  const handlePreviewSelect = (platform) => {
    if (!details.platforms.includes(platform)) {
      showToastOnce(`Please select the ${platform} platform first.`);
      return;
    }
    setActivePreviewPlatform((prev) => (prev === platform ? null : platform));
  };

  const handlePostTypeSelect = (type) => {
    if (postType === type) {
      setPostType(null);
      setSelectedPlatform([]);
      setActivePreviewPlatform(null);
      setSelectedImages([]);
      setSelectedVideo("");
      setDetails((prev) => ({
        ...prev,
        platforms: [],
        image: [],
        video: "",
      }));
      setSelectedOption("Schedule");
      setIsImageSelected(false);
      setIsVideoSelected(false);
    } else {
      setPostType(type);
      setSelectedPlatform([]);
      setActivePreviewPlatform(null);
      setSelectedImages([]);
      setSelectedVideo("");
      setDetails((prev) => ({
        ...prev,
        platforms: [],
        image: [],
        video: "",
      }));
      setIsImageSelected(false);
      setIsVideoSelected(false);
    }
  };

  // Handle file uploads for image and video
  const handleFileUpload = (e) => {
    if (!postType) {
      showToastOnce("Please select Post, Reels, or Video first.");
      return;
    }

    const files = Array.from(e.target.files);
    if (files && files.length > 0) {
      files.forEach((file) => {
        const fileType = file.type.split("/")[0];
        const fileExtension = file.name.split(".").pop().toLowerCase();
        const allowedImageFormats = ["pdf", "jpeg", "jpg", "png"];
        const maxVideoDuration = postType === "reels" ? 60 : 14400;
        const maxFileSize = postType === "reels" ? 1 * 1024 * 1024 * 1024 : 10 * 1024 * 1024 * 1024;

        if (postType === "post" && fileType === "image") {
          if (selectedPlatform.includes("facebook") && !allowedImageFormats.includes(fileExtension)) {
            showToastOnce("Only .pdf, .jpeg, .jpg, or .png formats are allowed for images in Facebook.");
            return;
          }
          if (selectedPlatform.includes("facebook") && details.image.length + files.length > 10) {
            showToastOnce("You can only upload up to 10 images for Facebook.");
            return;
          }

          const reader = new FileReader();
          reader.onloadend = () => {
            const fileContent = reader.result;
            if (!details.image.includes(fileContent)) {
              setSelectedImages((prev) => [...prev, fileContent]);
              setIsImageSelected(true);
              setIsVideoSelected(false);
            }
          };
          reader.readAsDataURL(file);
        }

        if ((postType === "post" || postType === "reels" || postType === "video") && fileType === "video" && fileExtension === "mp4") {
          if (isVideoSelected) {
            showToastOnce("Only one video can be selected. Please remove the current video to select another.");
            return;
          }

          const videoElement = document.createElement("video");
          videoElement.src = URL.createObjectURL(file);
          videoElement.onloadedmetadata = () => {
            const videoDuration = videoElement.duration;
            const fileSize = file.size;

            if (videoDuration > maxVideoDuration) {
              showToastOnce(
                postType === "reels"
                  ? "Reels can only be 60 seconds long."
                  : "Videos for Facebook can only be 240 minutes long."
              );
              return;
            }

            if (fileSize > maxFileSize) {
              showToastOnce(
                postType === "reels"
                  ? "Reels can only be up to 1GB in size."
                  : "Videos for Facebook can only be up to 10GB in size."
              );
              return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
              const fileContent = reader.result;
              setSelectedVideo(fileContent);
              setIsVideoSelected(true);
              setIsImageSelected(false);
            };
            reader.readAsDataURL(file);
          };
        } else if (fileType === "video") {
          showToastOnce("Only MP4 videos can be uploaded.");
        }
      });
    }
  };

  const handleLocationSearch = async (e) => {
    if (!postType) {
      showToastOnce("Please select Post, Reels, or Video first.");
      return;
    }

    const query = e.target.value;
    if (!query) {
      setLocationSuggestions([]);
      return;
    }
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=YOUR_GOOGLE_API_KEY`
    );
    const data = await response.json();
    setLocationSuggestions(data.predictions);
  };

  const handleLocationSelect = (location) => {
    setDetails((prev) => ({
      ...prev,
      location: location.description,
    }));
    setLocationSuggestions([]);
    setActiveComponent(null);
  };

  const handleHashtagSearch = (e) => {
    if (!postType) {
      showToastOnce("Please select Post, Reels, or Video first.");
      return;
    }

    const query = e.target.value.trim();
    const searchQuery = query.startsWith("#") ? query : `#${query}`;
    const filteredHashtags = fetchedHashtags.filter((hashtag) =>
      hashtag.includes(searchQuery)
    );
    setSuggestedHashtags(filteredHashtags);
  };

  const handleHashtagSelect = (hashtag) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags((prevHashtags) =>
        prevHashtags.filter((h) => h !== hashtag)
      );
      setDetails((prev) => {
        const newCaption = prev.caption
          .split(" ")
          .filter((word) => word !== hashtag)
          .join(" ");
        return {
          ...prev,
          caption: newCaption,
        };
      });
      setHashtagCount((prev) => prev - 1);
    } else {
      if (selectedHashtags.length >= 30) {
        showToastOnce("You have reached the hashtag limit of 30.");
        return;
      }

      setDetails((prev) => {
        const newCaption = `${prev.caption.trim()} ${hashtag}`.trim();
        return {
          ...prev,
          caption: newCaption,
        };
      });

      setSelectedHashtags((prevHashtags) => {
        const updatedHashtags = [...prevHashtags, hashtag];
        setHashtagCount(updatedHashtags.length);
        return updatedHashtags;
      });
    }
  };

  const handleHashtagRemove = (hashtag) => {
    setDetails((prev) => {
      const newCaption = prev.caption
        .split(" ")
        .filter((word) => word !== hashtag)
        .join(" ");
      return {
        ...prev,
        caption: newCaption,
      };
    });

    setSelectedHashtags((prevHashtags) =>
      prevHashtags.filter((h) => h !== hashtag)
    );
    setHashtagCount((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOptionClick = (option) => {
    if (option === "Scheduled Post") {
      if (!details.caption) {
        toast.error("Please write a caption.");
        return;
      }
      if (details.image.length === 0 && !details.video) {
        toast.error("Please select at least one image.");
        return;
      }
      if (!details.publishDate) {
        toast.error("Please select a publish date and time.");
        return;
      }
    }

    if (option === "Share Now" || option === "Share Next") {
      if (!postType) {
        toast.error("Please select a media type (Post, Video, or Reels).");
        return;
      }
      if (selectedPlatform.length === 0) {
        toast.error("Please select at least one platform.");
        return;
      }
    }

    const platformDetails = selectedPlatform.map((platform) => {
      const id = Date.now() + Math.random();
      return {
        id,
        [platform]: {
          platforms: platform,
          color: platformColors[platform] || "default color",
          icon: `${platform}`,
          option: postType,
        },
      };
    });

    if (option === "Scheduled Post") {
      navigate("calendar", {
        state: {
          platformDetails,
          postType,
          selectedOption: option,
          caption: details.caption,
          image: details.image,
          video: details.video,
          publishDate: details.publishDate,
        },
      });
      closeModal();
    } else if (option === "Share Now" || option === "Share Next") {
      if (!postType || selectedPlatform.length === 0) {
        toast.error("Please select both a media type and at least one platform.");
        return;
      }

      navigate("calendar", {
        state: {
          platformDetails,
          postType,
          selectedOption: option,
          video: details.video,
        },
      });
      closeModal();
    } else {
      setPopupContent(option);
      setShowPopup(true);
    }
  };

  const handleAcceptClick = () => {
    if (selectedVideo) {
      setDetails((prev) => ({
        ...prev,
        video: selectedVideo,
      }));
    }

    setDetails((prev) => ({
      ...prev,
      image: [...prev.image, ...selectedImages],
    }));

    setSelectedImages([]);
    setSelectedVideo("");
    setShowPopup(false);
    setPopupContent(null);
  };

  const handleCancelClick = () => {
    setSelectedImages([]);
    setShowPopup(false);
    setPopupContent(null);
    setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
    setIsImageSelected(false);
  };

  const handleRemoveVideo = () => {
    setSelectedVideo("");
    setDetails((prev) => ({
      ...prev,
      video: "",
    }));
    setIsVideoSelected(false);
  };

  const scheduleDropdown = () => {
    if (!postType) {
      showToastOnce("Please select Post, Reels, or Video first.");
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleOptionscheduleClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSelectedOptionClick = (platform) => {
    if (selectedOption === "Share Now") {
      handleOptionClick("Share Now");
    } else if (selectedOption === "Share Next") {
      handleOptionClick("Share Next");
    } else if (selectedOption === "Scheduled Post") {
      handleOptionClick("Scheduled Post");
    } else {
      toast.error("Please select a valid option before closing.");
    }

    setSelectedPlatform((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleToggle = () => {
    if (!postType) {
      showToastOnce("Please select Post, Reels, or Video first.");
      return;
    }
    setIsOn(!isOn);
  };

  const handleDayToggle = (day) => {
    if (!postType) {
      showToastOnce("Please select Post, Reels, or Video first.");
      return;
    }

    const currentDayIndex = new Date().getDay();
    const selectedDayIndex = daysOfWeek.indexOf(day);

    if (selectedDayIndex < currentDayIndex) {
      return;
    }

    setAutoPostSettings((prev) => {
      const updatedDays = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days: updatedDays };
    });
  };

  const handleTimeChange = (time) => {
    setAutoPostSettings((prev) => ({ ...prev, time }));
  };

  const handleSaveAutoPostSettings = () => {
  };

  const handleRemoveAcceptedImage = (index) => {
    setDetails((prev) => {
      const newImages = [...prev.image];
      newImages.splice(index, 1);
      return {
        ...prev,
        image: newImages,
      };
    });
    setIsImageSelected(false);
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleCancelAutoPostSettings = () => {
    setAutoPostSettings({
      days: [],
      time: new Date(),
    });
    setIsOn(false);
  };

  const renderPopup = () => {
    if (!popupContent) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-[50rem] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleCancelClick()}
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
          {popupContent === "Add Image" && (
            <>
              <h2 className="text-lg font-bold mb-4">Image Upload</h2>
              {uploadFrom === "computer" && (
                <div
                  className="border border-dashed border-gray-300 rounded-md p-20 flex items-center justify-center text-gray-500 cursor-pointer"
                  ref={dropAreaRef}
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  Click to select or drag your file here.
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    multiple
                  />
                </div>
              )}

              {selectedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2 h-[30vh] overflow-y-auto">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Selected ${index + 1}`}
                        className="object-cover rounded-md w-full h-24"
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white rounded-md px-4 py-2"
                  onClick={() => handleCancelClick()}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2"
                  onClick={handleAcceptClick}
                >
                  Accept
                </button>
              </div>
            </>
          )}
          {popupContent === "Add Video" && (
            <>
              <h2 className="text-lg font-bold mb-4">Video Upload</h2>
              {uploadFrom === "computer" && (
                <div
                  className="border border-dashed border-gray-300 rounded-md p-20 flex items-center justify-center text-gray-500 cursor-pointer"
                  ref={dropAreaRef}
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  Click to select or drag your file here.
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                  />
                </div>
              )}
              {selectedVideo && (
                <div className="mt-4 relative">
                  <video
                    controls
                    src={selectedVideo}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    onClick={handleRemoveVideo}
                  >
                    <FaTimes size={10} />
                  </button>
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white rounded-md px-4 py-2"
                  onClick={() => handleCancelClick()}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2"
                  onClick={handleAcceptClick}
                >
                  Accept
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    const platformsToShow = selectedPlatform.filter((platform) =>
      details.platforms.includes(platform)
    );

    if (platformsToShow.length === 0) {
      return null;
    }

    return (
      <div className="p-4 w-full rounded-lg border border-gray-300 mt-[3.1rem]">
        <div className="flex justify-center space-x-2 mb-4">
          {platformsToShow.map((platform) => {
            const Icon = platformIcons[platform];
            const color = platformColors[platform];
            const isSelected = activePreviewPlatform === platform;
            return (
              <div key={platform} className="relative">
                <div
                  className={`border-2 p-1 rounded-md flex items-center justify-center h-[32px] w-[32px] ${isSelected ? "border-blue-500" : ""
                    }`}
                  onClick={() => handlePreviewSelect(platform)}
                  style={{
                    borderColor: isSelected ? color : "transparent",
                  }}
                >
                  <Icon className="h-6 w-6" color={platformColors[platform]} />
                </div>
                {isSelected && (
                  <div className="absolute top-[-7px] right-[-8px] bg-white rounded-full shadow-sm p-0.5 flex items-center justify-center">
                    <FaCheck className="h-3 w-3 text-green-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {postType === "post" && (
          <>
            {details.video && activePreviewPlatform && (
              <>
                <div className="p-4 bg-white shadow-md rounded-lg w-full">
                  <div className="flex justify-between items-center p-2">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full h-8 w-8">img</div>
                      <div className="ml-2">
                        <div className="font-bold text-sm">@username</div>
                        <div className="text-xs text-gray-500">
                          Sunday at{" "}
                          {details.publishTime?.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <video
                    src={details.video}
                    className="object-cover w-full h-64 rounded-md"
                    controls
                    muted
                  />
                  <div className="mt-2 text-sm whitespace-pre-wrap break-words max-h-[10vh] overflow-y-auto">
                    {details.caption}
                  </div>
                  <div className="p-2">
                    <div className="flex items-center space-x-4 mt-2 text-gray-500">
                      <button className="flex items-center space-x-2">
                        <SlLike />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-2 pl-20">
                        <FaRegComment />
                        <span>Comment</span>
                      </button>
                      <button className="flex items-center space-x-2 pl-12">
                        <PiShareFatThin />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {details.image.length > 0 && activePreviewPlatform && (
              <>
                {activePreviewPlatform === "instagram" && (
                  <InstagramPreview selectedImages={details.image} details={details} postType={postType} />
                )}
                {activePreviewPlatform === "facebook" && (
                  <FacebookPreview selectedImages={details.image} selectedVideo={details.video} details={details} postType={postType} />
                )}
                {activePreviewPlatform === "linkedin" && (
                  <LinkedinPreview selectedImages={details.image} details={details} postType={postType} />
                )}
                {activePreviewPlatform === "twitter" && (
                  <TwitterPreview selectedImages={details.image} details={details} postType={postType} />
                )}
              </>
            )}

            {details.image.length === 0 && !details.video && (
              <div className="text-center text-gray-500">
                Select an image or video to see the post preview.
              </div>
            )}
          </>
        )}

        {postType === "reels" && details.video && (
          <>
            {activePreviewPlatform === "instagram" && (
              <InstagramPreview selectedVideo={details.video} details={details} postType={postType} />
            )}
            {activePreviewPlatform === "facebook" && (
              <FacebookPreview selectedVideo={details.video} details={details} postType={postType} />
            )}
            {activePreviewPlatform === "linkedin" && (
              <LinkedinPreview selectedVideo={details.video} details={details} postType={postType} />
            )}
            {activePreviewPlatform === "youtube" && (
              <YoutubePreview selectedVideo={details.video} details={details} postType={postType} />
            )}
            {activePreviewPlatform === "twitter" && (
              <div className="text-center text-gray-500">
                Twitter does not support Reels.
              </div>
            )}
          </>
        )}

        {postType === "video" && details.video && (
          <>
            {activePreviewPlatform === "youtube" && (
              <YoutubePreview selectedImages={details.image} details={details} postType={postType} />
            )}
            {["instagram", "facebook", "linkedin", "twitter"].includes(activePreviewPlatform) && (
              <div className="text-center text-gray-500">
                Only YouTube supports video posts.
              </div>
            )}
          </>
        )}

        {details.image.length === 0 && postType === "post" && (
          <div className="text-center text-gray-500">
          </div>
        )}

        {!details.video && postType === "video" && (
          <div className="text-center text-gray-500">
            Select a video to see the video preview.
          </div>
        )}

        {!details.video && postType === "reels" && (
          <div className="text-center text-gray-500">
            Select a video to see the reels preview.
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="relative flex w-[90vw] h-[90vh] overflow-y-auto px-10 pt-8 rounded-xl"
      ref={modalRef}
    >
      <ToastContainer
        position="top-right"
        closeOnClick
        theme="light"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <form
        onSubmit={handleSubmit}
        className="w-[65rem] space-y-4 pr-4 border-gray-300"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold mb-2">Create New Post</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {Object.keys(platformIcons).map((platform, index) => {
                const Icon = platformIcons[platform];
                const color = platformColors[platform];
                const isSelected = details.platforms.includes(platform);

                let isDisabled = false;
                if (postType === "post" && platform === "youtube") {
                  isDisabled = true;
                } else if (postType === "video" && platform !== "youtube") {
                  isDisabled = true;
                } else if (postType === "reels" && platform === "twitter") {
                  isDisabled = true;
                }

                return (
                  <div key={index} className="flex items-center mb-2">
                    <div
                      className={`flex items-center space-x-2 p-1 border border-gray-300 rounded-md h-[32px] w-[32px] ${isSelected ? "bg-gray-200 border-2" : ""
                        } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                      onClick={() => !isDisabled && handlePlatformSelect(platform)}
                      style={{
                        borderColor: isSelected ? color : "transparent",
                      }}
                    >
                      <Icon
                        className={`h-5 w-5 ${isSelected ? `text-[${color}]` : "text-[#000]"
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative flex items-center space-x-1 justify-end ml-auto">
              <button
                type="button"
                className={`px-4 py-1 rounded-l-xl border border-gray-300 ${postType === "post" ? "bg-blue-100" : ""
                  } hover:bg-blue-200`}
                onClick={() => handlePostTypeSelect("post")}
              >
                POST
              </button>
              <button
                type="button"
                className={`px-4 py-1 border border-gray-300 ${postType === "video" ? "bg-blue-100" : ""
                  } hover:bg-blue-200`}
                onClick={() => handlePostTypeSelect("video")}
              >
                VIDEO
              </button>
              <button
                type="button"
                className={`px-4 py-1 rounded-r-xl border border-gray-300 ${postType === "reels" ? "bg-blue-100" : ""
                  } hover:bg-blue-200`}
                onClick={() => handlePostTypeSelect("reels")}
              >
                REELS
              </button>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="relative mb-2">
            <div className="w-full min-h-[50vh] border border-gray-300 rounded-md p-2">
              <textarea
                name="caption"
                value={details.caption}
                onChange={handleChange}
                placeholder="Write a caption..."
                required
                className="w-full h-[31vh] outline-none resize-none"
              />
            </div>
            {details.image.length > 0 && (
              <div className="absolute bottom-12 left-2 flex space-x-2 max-w-[52.5vw] overflow-x-auto">
                {details.image.map((image, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={image}
                      alt={`Selected ${index + 1}`}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemoveAcceptedImage(index)}
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {details.video && (
              <div className="absolute bottom-12 left-2 flex space-x-2 max-w-[49.5vw] overflow-x-auto">
                <div className="relative flex-shrink-0">
                  <video
                    src={details.video}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <button
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={handleRemoveVideo}
                  >
                    <FaTimes size={10} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="absolute flex items-center justify-between w-full bottom-0 px-4">
            <div className="space-x-2 pt-2 pb-4">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  if (!postType) {
                    showToastOnce("Please select Post, Reels, or Video first.");
                    return;
                  }
                  setActiveComponent((prev) =>
                    prev === "image" ? null : "image"
                  );
                }}
                ref={imageIconRef}
                disabled={isVideoSelected}
              >
                <FaImages size={20} />
              </button>
              <button
                type="button"
                className="text-gray-500 pl-1.5 hover:text-gray-700 hashtag-button"
                onClick={() => {
                  if (!postType) {
                    showToastOnce("Please select Post, Reels, or Video first.");
                    return;
                  }
                  setActiveComponent("hashtags");
                  fetchHashtags();
                }}
              >
                <CiHashtag size={20} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!postType) {
                    showToastOnce("Please select Post, Reels, or Video first.");
                    return;
                  }
                  setActiveComponent("emoji");
                }}
                className="text-gray-500 pl-1.5 hover:text-gray-700"
                ref={emojiPickerRef}
              >
                <HiOutlineEmojiHappy size={20} />
              </button>
              <button
                type="button"
                className="text-gray-500 pl-1.5 hover:text-gray-700"
                onClick={() => {
                  if (!postType) {
                    showToastOnce("Please select Post, Reels, or Video first.");
                    return;
                  }
                  setActiveComponent("location");
                }}
              >
                <IoLocationOutline size={20} />
              </button>
              <button
                type="button"
                className="text-gray-500 pl-1.5 hover:text-gray-700"
                onClick={() => {
                  if (!postType) {
                    showToastOnce("Please select Post, Reels, or Video first.");
                    return;
                  }
                }}
              >
                <RiRobot3Line size={20} />
              </button>
            </div>
            <div className="flex ml-auto pl-80 text-gray-500 text-sm">
              <span className="flex mr-2">
                {hashtagCount}/30
                <CiHashtag className="mt-[0.10rem] size-4" />
              </span>
              {characterCount}/2500
            </div>
          </div>
        </div>
        {activeComponent === "hashtags" && (
          <div id="hashtags" className="relative mt-4">
            <input
              type="text"
              ref={hashtagInputRef}
              onChange={handleHashtagSearch}
              placeholder="Search hashtags..."
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {suggestedHashtags.length > 0 && (
              <div className="absolute z-50 mt-2 left-0 w-full bg-white rounded-md shadow-lg max-h-64 overflow-y-auto">
                {suggestedHashtags.map((hashtag) => (
                  <div
                    key={hashtag}
                    className="flex items-center justify-between p-2 w-full text-left hover:bg-gray-100"
                  >
                    <button
                      type="button"
                      onClick={() => handleHashtagSelect(hashtag)}
                      className="w-full text-left"
                    >
                      {hashtag}
                    </button>
                    {selectedHashtags.includes(hashtag) && (
                      <FaTimes
                        size={12}
                        className="text-red-500 cursor-pointer ml-2"
                        onClick={() => handleHashtagRemove(hashtag)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeComponent === "image" && postType === "post" && (
          <div
            id="image"
            className="absolute z-50 bg-white rounded-md border border-gray-200 shadow-lg w-40 max-h-64"
          >
            <button
              type="button"
              className="flex items-center p-2 w-full text-left hover:bg-gray-100 text-sm"
              onClick={() => handleOptionClick("Add Image")}
              disabled={isVideoSelected}
            >
              <CiCamera className="mr-2" size={15} />
              Add Image
            </button>
            <button
              type="button"
              className="flex items-center p-2 w-full text-left hover:bg-gray-100 text-sm"
              onClick={() => handleOptionClick("Add Video")}
              disabled={details.image.length > 0}
            >
              <CiVideoOn className="mr-2" size={15} />
              Add Video
            </button>
          </div>
        )}

        {activeComponent === "image" && (postType === "video" || postType === "reels") && (
          <div
            id="image"
            className="absolute z-50 bg-white rounded-md border border-gray-200 shadow-lg w-40 max-h-64"
          >
            <button
              type="button"
              className="flex items-center p-2 w-full text-left hover:bg-gray-100 text-sm"
              onClick={() => handleOptionClick("Add Video")}
            >
              <CiVideoOn className="mr-2" size={15} />
              Add Video
            </button>
          </div>
        )}

        {activeComponent === "emoji" && renderEmojiPicker(
          <div
            id="emoji"
            className="absolute z-50 shadow-lg rounded-lg bg-white p-2 border border-gray-200"
          >
            <Picker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
        {activeComponent === "location" && (
          <div id="location" className="relative mt-4">
            <input
              type="text"
              ref={locationInputRef}
              value={details.location}
              onChange={handleLocationSearch}
              placeholder="Search location..."
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {locationSuggestions.length > 0 && (
              <div className="absolute z-50 mt-2 left-0 w-full bg-white rounded-md shadow-lg max-h-64">
                {locationSuggestions.map((location) => (
                  <button
                    key={location.place_id}
                    type="button"
                    className="flex items-center p-2 w-full text-left hover:bg-gray-100"
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location.description}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {showYoutubePopup && (
          <div className="relative mt-2 w-full">
            <div className="border border-red-500 rounded-lg p-4 text-red-500 relative">
              <div className="absolute -top-3 left-4 bg-white px-1">
                REMEMBER
              </div>
              <div className="absolute -top-3 right-4 bg-white px-1 flex items-center">
                <FaExclamationTriangle />
                <span className="ml-1">1</span>
              </div>
              <p>1. Publish date can't be a past date</p>
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
        />
        <div className="flex items-center justify-end">
          <span className="text-gray-700 dark:text-gray-300 pr-1">
            Auto Post
          </span>
          <div
            onClick={handleToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${isOn ? "bg-green-500" : "bg-gray-300"
              }`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOn ? "translate-x-6" : "translate-x-1"
                }`}
            />
          </div>
        </div>

        {isOn && (
          <div className="mt-4 border rounded-lg bg-gray-50 p-4">
            <h3 className="font-bold mb-2">Auto Post Settings</h3>
            <div className="flex items-center justify-between">
              <div className="flex mb-4 items-center justify-between space-x-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`h-8 w-14 rounded-xl border ${autoPostSettings.days.includes(day)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                      }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="mb-4 flex items-center justify-between space-x-3">
                <div className="font-medium text-gray-700 mb-1 flex items-center justify-center">
                  Select Time
                </div>
                <div className="">
                  <DatePicker
                    selected={autoPostSettings.time}
                    onChange={handleTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="border rounded-md w-[5rem] p-2"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancelAutoPostSettings}
                className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAutoPostSettings}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div className="flex item-center justify-between w-full space-x-4">
          <button
            type="button"
            className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => setDetails({ ...details, caption: "", image: [], video: "" })}
          >
            Clear
          </button>
          <div className="flex items-center space-x-2 ml-auto">
            <div className="relative flex items-center">
              <DatePicker
                selected={details.publishDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="border border-gray-300 rounded-md pl-8 py-2 w-[15rem]"
                ref={datePickerRef}
                minDate={new Date()}
                timeIntervals={1}
                filterTime={filterPassedTime}
              />
              <button
                type="button"
                onClick={() => datePickerRef.current.setOpen(true)}
                className="text-gray-400"
              >
                <MdCalendarToday
                  size={15}
                  className="absolute left-2 top-3 h-4 w-4"
                />
              </button>
            </div>
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div className="flex">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-l-md flex items-center truncate ${selectedOption === "Share Now" || selectedOption === "Share Next"
                    ? "bg-gray-700 text-white hover:bg-black"
                    : (selectedOption === "Scheduled Post" && details.caption && (details.image.length > 0 || details.video))
                      ? "bg-gray-700 text-white hover:bg-black"
                      : "bg-gray-200 text-gray-700"} ${selectedOption === "Schedule"
                        ? ""
                        : (selectedOption === "Scheduled Post" && (!details.caption || (details.image.length === 0 && !details.video)))
                          ? "cursor-not-allowed"
                          : "hover:bg-gray-900"}`}
                  onClick={() => handleSelectedOptionClick(selectedPlatform)}
                  disabled={selectedOption === "Scheduled Post" && (!details.caption || (details.image.length === 0 && !details.video))}
                >
                  {selectedOption}
                </button>

                <div className="mr-[2px]"></div>

                <button
                  type="button"
                  className="px-2 py-2 bg-gray-900 text-white rounded-r-md flex items-center"
                  onClick={scheduleDropdown}
                >
                  <FaChevronDown className="h-4 w-4" />
                </button>
              </div>

              {isOpen && (
                <div className="absolute mt-1 right-0 w-32 rounded-md border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {options.map((option, index) => (
                      <a
                        key={index}
                        href="#"
                        onClick={() => handleOptionscheduleClick(option)}
                        className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {option}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </form>
      <div className="w-[31rem] pl-4">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4 text-center">Preview</h2>
          {renderPreview()}
        </div>
      </div>
      {showPopup && renderPopup()}
    </div>
  );
};

export default CalendarModal;