import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./r.css";

const Rsvp = () => {
  const [attending, setAttending] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // reset errors

    const fullName = e.target.fullName.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    // VALIDATIONS
    let newErrors = {};
    if (!fullName) newErrors.fullName = "Full Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    if (!attending) newErrors.attending = "Please select attending option.";

    if (attending === "yes") {
      const meal = e.target.meal?.value;
      if (!meal) newErrors.meal = "Please select a meal.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);

    const data = {
      fullName,
      email,
      attending,
      meal: attending === "yes" ? e.target.meal?.value || "" : "",
      stay: attending === "yes" ? e.target.stay?.value || "" : "",
      nights:
        attending === "yes"
          ? {
              friday: e.target.nightFriday?.checked || false,
              saturday: e.target.nightSaturday?.checked || false,
            }
          : {},
      dietary: attending === "yes" ? e.target.dietary.value : "",
      plusOne: attending === "yes" ? e.target.plusOne.value : "",
      message,
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "rsvpEntries"), data);
      toast.success("RSVP Submitted Successfully! ");
      e.target.reset();
      setAttending(null);
    } catch (err) {
      console.error(err);
      toast.error("Error submitting RSVP. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="dress">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="dress_content">
        <h2 className="drss_topic">RSVP</h2>

        <p className="dress_para">
          Please respond by March 15, 2026. Adults-only celebration. Only
          invited guests may attend; names must match the invitation.
        </p>

        <form onSubmit={handleSubmit} className="rsvp_form">
          {/* Full Name */}
          <div className="form_input_section">
            <label className="form_label">Full Name</label>
            <input type="text" name="fullName" className="form_input" />
            {errors.fullName && (
              <span className="error_span">{errors.fullName}</span>
            )}
          </div>

          {/* Email */}
          <div className="form_input_section">
            <label className="form_label">Email Address</label>
            <input type="email" name="email" className="form_input" />
            {errors.email && <span className="error_span">{errors.email}</span>}
          </div>

          {/* Attendance */}
          <div className="form_input_section">
            <label className="form_label">Will you be attending?</label>

            <div className="radio_section">
              <input
                type="radio"
                name="attending"
                value="yes"
                onChange={() => setAttending("yes")}
              />
              <h3 className="radio_text">Yes</h3>
            </div>

            <div className="radio_section">
              <input
                type="radio"
                name="attending"
                value="no"
                onChange={() => setAttending("no")}
              />
              <h3 className="radio_text">No</h3>
            </div>
            {errors.attending && (
              <span className="error_span">{errors.attending}</span>
            )}
          </div>

          {/* Conditional RSVP fields for Yes */}
          {attending === "yes" && (
            <>
              {/* Meal Selection */}
              <div className="form_input_section">
                <label className="form_label">Meal Selection</label>

                <div className="radio_section">
                  <input type="radio" name="meal" value="Chicken" />
                  <h3 className="radio_text">Chicken</h3>
                </div>

                <div className="radio_section">
                  <input type="radio" name="meal" value="Beef" />
                  <h3 className="radio_text">Beef</h3>
                </div>
                {errors.meal && (
                  <span className="error_span">{errors.meal}</span>
                )}
              </div>

              {/* Hotel Stay */}
              <div className="form_input_section">
                <label className="form_label">
                  Will you be staying overnight?
                </label>

                <div className="radio_section">
                  <input type="radio" name="stay" value="yes" />
                  <h3 className="radio_text">Yes</h3>
                </div>

                <div className="radio_section">
                  <input type="radio" name="stay" value="no" />
                  <h3 className="radio_text">No</h3>
                </div>
              </div>

              {/* Selected Nights */}
              <div className="form_input_section">
                <label className="form_label">Which night(s)?</label>

                <div className="radio_section">
                  <input type="checkbox" name="nightFriday" />
                  <h3 className="radio_text">Friday, April 24, 2026</h3>
                </div>

                <div className="radio_section">
                  <input type="checkbox" name="nightSaturday" />
                  <h3 className="radio_text">Saturday, April 25, 2026</h3>
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div className="form_input_section">
                <label className="form_label">Dietary Restrictions</label>
                <textarea
                  name="dietary"
                  className="form_input"
                  placeholder="Allergies, preferences, or special requirements"
                ></textarea>
              </div>

              {/* Plus One */}
              <div className="form_input_section">
                <label className="form_label">
                  Plus One Name (If Approved)
                </label>
                <input
                  type="text"
                  name="plusOne"
                  className="form_input"
                  placeholder="Enter plus one’s full name"
                />
              </div>
            </>
          )}

          {/* Message to Couple (Always Shown) */}
          <div className="form_input_section">
            <label className="form_label">Message to the Couple</label>
            <textarea
              name="message"
              className="form_input"
              placeholder="Send your warm wishes..."
            ></textarea>
          </div>

          <button type="submit" className="form_submit_btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit RSVP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rsvp;
