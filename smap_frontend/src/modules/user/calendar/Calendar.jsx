import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFilter,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import DropdownMenu from "./DropdownMenu";
import FilterModal from "./FilterModal";
import useModal from "../../../hooks/useModal";
import { useLocation } from "react-router-dom";
import LZString from "lz-string";

const socialMediaIcons = {
  facebook: { icon: FaFacebook, color: "#3b5998" },
  twitter: { icon: FaXTwitter, color: "black" },
  instagram: { icon: FaInstagram, color: "#E4405F" },
  linkedin: { icon: FaLinkedin, color: "#0077b5" },
  youtube: { icon: FaYoutube, color: "#FF0000" },
};

const Calendar = () => {
  const location = useLocation();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [calendarTitle, setCalendarTitle] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const { openModal, closeModal } = useModal();
  const calendarRef = useRef(null);

  // UseEffect to handle new events based on location state (e.g., adding events to the calendar)
  useEffect(() => {
    if (location.state) {
      const { platformDetails, postType, selectedOption, caption, image, publishDate } = location.state;

      platformDetails.forEach((platformDetail) => {
        const id = platformDetail.id;

        const platformKey = Object.keys(platformDetail).find((key) => key !== "id");
        const { platforms } = platformDetail[platformKey];

        const event = {
          id,
          title: `${postType} on ${platforms}`,
          start: publishDate || new Date(),
          extendedProps: {
            platformDetail: platformDetail[platformKey],
            selectedOption: selectedOption,
          },
        };

        if (caption) event.extendedProps.caption = caption;
        if (image) event.extendedProps.image = image;

        addEventToCalendar(event);
      });
    }
  }, [location.state]);

  // UseEffect to load the events from localStorage when the component loads
  useEffect(() => {
    if (calendarRef.current) {
      const storedEventsCompressed = localStorage.getItem("events");
      let storedEvents = [];

      if (storedEventsCompressed) {
        const decompressed = LZString.decompress(storedEventsCompressed);
        storedEvents = decompressed ? JSON.parse(decompressed) : [];
      }

      setCurrentEvents(storedEvents);

      const calendarApi = calendarRef.current.getApi();
      if (storedEvents.length > 0) {
        storedEvents.forEach((event) => {
          calendarApi.addEvent(event);
        });
      }
    }
  }, []);

  // Store current events in localStorage whenever the currentEvents state changes
  useEffect(() => {
    const optimizedEvents = currentEvents.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      extendedProps: {
        platformDetail: event.extendedProps.platformDetail,
        selectedOption: event.extendedProps.selectedOption,
      },
    }));

    const compressedEvents = LZString.compress(JSON.stringify(optimizedEvents));
    localStorage.setItem("events", compressedEvents);
  }, [currentEvents]);

  // Function to add an event to the calendar and update state
  const addEventToCalendar = (event) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);
    setCurrentEvents((prevEvents) => [...prevEvents, event]);
  };

  // Function to delete an event from the calendar and update state
  const deleteEventFromCalendar = (eventId) => {
    const updatedEvents = currentEvents.filter((event) => event.id !== eventId);

    setCurrentEvents(updatedEvents);

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    const calendarApi = calendarRef.current.getApi();
    const eventToRemove = calendarApi.getEventById(eventId);
    if (eventToRemove) {
      eventToRemove.remove();
    }
  };

  // Function to apply filters to the calendar based on selected platforms
  const applyFilters = (platforms) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.removeAllEvents();

    if (platforms.length === 0) {
      currentEvents.forEach((event) => {
        calendarApi.addEvent(event);
      });
      return;
    }

    currentEvents.forEach((event) => {
      const eventPlatform = event.extendedProps.platformDetail.platforms.toLowerCase();

      if (platforms.some((selectedPlatform) => eventPlatform.includes(selectedPlatform.toLowerCase()))) {
        calendarApi.addEvent(event);
      }
    });
  };

  // Function to render event content with icons and details
  const renderEventContent = (eventInfo) => {
    const { platformDetail, days, caption } = eventInfo.event.extendedProps;
    const { platforms, color, option } = platformDetail;

    const viewType = eventInfo.view.type;

    let IconComponent = null;
    if (Array.isArray(platforms) && platforms.length > 0) {
      IconComponent = socialMediaIcons[platforms[0].toLowerCase()]?.icon;
    } else if (typeof platforms === "string") {
      IconComponent = socialMediaIcons[platforms.toLowerCase()]?.icon;
    }

    if (viewType === "dayGridMonth") {
      return (
        <div className="relative flex items-center justify-start h-[32px] p-2 bg-gray-300 rounded-lg w-auto">
          <div className="absolute left-0 top-0 h-full w-[4px] rounded-l-lg" style={{ backgroundColor: color }}></div>
          {IconComponent && (
            <div
              className="flex items-center justify-center w-[24px] h-[24px] rounded-full"
              style={{ backgroundColor: color }}
            >
              <IconComponent className="text-white" />
            </div>
          )}
          <div className="ml-2">
            <span>{option}</span>
            {days && (
              <div className="text-sm text-gray-500">
                <span>Scheduled for: {days.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="relative flex items-center justify-start p-2 bg-gray-200 rounded-lg">
        <div className="absolute left-0 top-0 h-full w-[4px] rounded-l-lg" style={{ backgroundColor: color }}></div>
        {IconComponent && (
          <div
            className="flex items-center justify-center w-[24px] h-[24px] rounded-full"
            style={{ backgroundColor: color }}
          >
            <IconComponent className="text-white" />
          </div>
        )}
        <div className="ml-2">
          <span className="font-bold text-black">{option}</span>
          <div className="text-sm text-gray-500">
            {eventInfo.event.start && (
              <div>
                Time: {new Date(eventInfo.event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
              </div>
            )}
            {caption && <div>Caption: {caption}</div>}
          </div>
        </div>
      </div>
    );
  };

  // Function to change calendar view (month, week, day)
  const changeView = (view) => {
    setCurrentView(view);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
      setCalendarTitle(calendarApi.view.title);
    }
  };

  // Function to handle previous button click on the calendar
  const handlePrevClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCalendarTitle(calendarApi.view.title);
    }
  };

  // Function to handle next button click on the calendar
  const handleNextClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setCalendarTitle(calendarApi.view.title);
    }
  };

  // Function to handle filter button click and open filter modal
  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  // Function to close filter modal
  const handleCloseFilter = (e) => {
    e.preventDefault();
    setShowFilterModal(false);
  };

  // Function to handle event drop action in the calendar
  const handleEventDrop = (info) => {
    const { start, end, id, extendedProps } = info.event;
    const originalStart = new Date(info.oldEvent.start).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const dropDate = new Date(start).setHours(0, 0, 0, 0);

    const { selectedOption } = extendedProps;

    if (selectedOption === "Share Now" || originalStart < currentDate || dropDate < currentDate) {
      info.revert();
      return;
    }

    const updatedEvent = {
      id,
      title: info.event.title,
      start: start.toISOString(),
      end: end ? end.toISOString() : null,
      allDay: info.event.allDay,
      extendedProps: {
        ...extendedProps,
      },
    };

    const updatedEvents = currentEvents.map((event) =>
      event.id === id ? updatedEvent : event
    );
    setCurrentEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  // Function to handle event click (delete confirmation)
  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event "${clickInfo.event.title}"?`)) {
      deleteEventFromCalendar(clickInfo.event.id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button onClick={handlePrevClick} className="px-2">
            <FaChevronLeft />
          </button>
          <h2 className="text-xl font-bold">{calendarTitle}</h2>
          <button onClick={handleNextClick} className="px-2">
            <FaChevronRight />
          </button>
        </div>
        <div className="">
          <div className="flex bg-gray-100 rounded-lg shadow-inner p-1">
            <button
              className={`px-4 py-2 rounded-l-lg ${currentView === "dayGridMonth" ? "bg-white shadow" : "hover:bg-gray-200"} focus:outline-none`}
              onClick={() => changeView("dayGridMonth")}
            >
              Month
            </button>
            <button
              className={`px-4 py-2 ${currentView === "timeGridWeek" ? "bg-white shadow" : "hover:bg-gray-200"} focus:outline-none`}
              onClick={() => changeView("timeGridWeek")}
            >
              Week
            </button>
            <button
              className={`px-4 py-2 rounded-r-lg ${currentView === "timeGridDay" ? "bg-white shadow" : "hover:bg-gray-200"} focus:outline-none`}
              onClick={() => changeView("timeGridDay")}
            >
              Day
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <DropdownMenu selectedPlatforms={selectedPlatforms} setSelectedPlatforms={setSelectedPlatforms} applyFilters={applyFilters} />

          <button
            className="flex h-10 items-center px-4 py-2 border border-gray-300 rounded-lg bg-sky-500 text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleFilterClick}
          >
            <FaFilter className="mr-2" />
            Filter
          </button>
          <button
            className="flex h-10 items-center px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => openModal("CalendarModal")}
          >
            <FaPlus className="mr-2" />
            Create Post
          </button>
        </div>
      </div>

      <div className="mt-8">
        <FullCalendar
          ref={calendarRef}
          height="75vh"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={false}
          initialView={currentView}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={false}
          eventOrder="start,-duration,allDay,title"
          eventClick={handleEventClick}
          events={currentEvents}
          eventContent={renderEventContent}
          datesSet={() => {
            if (calendarRef.current) {
              setCalendarTitle(calendarRef.current.getApi().view.title);
            }
          }}
          eventDrop={handleEventDrop}
        />
      </div>
      <FilterModal
        showFilterModal={showFilterModal}
        handleCloseFilter={handleCloseFilter}
        applyFilters={applyFilters}
      />
    </div>
  );
};

export default Calendar;