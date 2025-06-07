import { useState, useRef, useEffect } from "react";
import { getEmailSuggestions } from "../services/emailServices";

const EmailInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [emailTags, setEmailTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  //email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //email tags add
  const addEmailTag = (email) => {
    if (!email.trim()) return;

    const isValid = isValidEmail(email);
    const newTag = {
      value: email.trim(),
      isValid,
    };

    setEmailTags([...emailTags, newTag]);
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // remove email tag
  const removeEmailTag = (index) => {
    const newTags = [...emailTags];
    newTags.splice(index, 1);
    setEmailTags(newTags);
  };

  // handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim()) {
      fetchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // handle key down event
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      addEmailTag(inputValue);
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      emailTags.length > 0
    ) {
      removeEmailTag(emailTags.length - 1);
    }
  };

  // fetch email suggestionss
  const fetchSuggestions = async (query) => {
    try {
      const results = await getEmailSuggestions(query);
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // suggestions click handle
  const handleSuggestionClick = (suggestion) => {
    addEmailTag(suggestion);
    inputRef.current.focus();
  };

  // close suggestionss when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex flex-wrap items-center gap-1  border-0 bg-[#FDFDFD] rounded-[8px] w-[400px] p-3 border-gray-300   shadow-2xl">
        {emailTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => removeEmailTag(index)}
            className={`flex items-center gap-1 p-2 rounded-md text-sm ${
              tag.isValid
                ? "text-black font-bold hover:bg-[#EDEDED]"
                : "text-black font-bold bg-[#F3C0C4] rounded-[6px] "
            }`}
          >
            <span>{tag.value}</span>
          </button>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="flex-grow outline-none min-w-[120px] border-0"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={emailTags.length === 0 ? "Enter recipients…" : ""}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-[#EFF5F9] cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailInput;
