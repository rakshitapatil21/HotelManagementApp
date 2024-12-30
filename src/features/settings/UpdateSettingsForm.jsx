// import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
// import Input from "../../ui/Input";
// import Spinner from "../../ui/Spinner";
// import { useSettings } from "./useSettings";
// import { useUpdateSetting } from "./useUpdateSetting";

// function UpdateSettingsForm() {
//   const {
//     isLoading,
//     settings: {
//       minBookingLength,
//       maxBookingLength,
//       maxGuestsPerBooking,
//       breakfastPrice,
//     } = {},
//   } = useSettings();
//   const { isUpdating, updateSetting } = useUpdateSetting();

//   if (isLoading) return <Spinner />;

//   function handleUpdate(e, field) {
//     const { value } = e.target;

//     if (!value) return;
//     updateSetting({ [field]: value });
//   }

//   return (
//     <Form>
//       <FormRow label="Minimum nights/booking">
//         <Input
//           type="number"
//           id="min-nights"
//           defaultValue={minBookingLength}
//           disabled={isUpdating}
//           onBlur={(e) => handleUpdate(e, "minBookingLength")}
//         />
//       </FormRow>

//       <FormRow label="Maximum nights/booking">
//         <Input
//           type="number"
//           id="max-nights"
//           defaultValue={maxBookingLength}
//           disabled={isUpdating}
//           onBlur={(e) => handleUpdate(e, "maxBookingLength")}
//         />
//       </FormRow>

//       <FormRow label="Maximum guests/booking">
//         <Input
//           type="number"
//           id="max-guests"
//           defaultValue={maxGuestsPerBooking}
//           disabled={isUpdating}
//           onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
//         />
//       </FormRow>

//       <FormRow label="Breakfast price">
//         <Input
//           type="number"
//           id="breakfast-price"
//           defaultValue={breakfastPrice}
//           disabled={isUpdating}
//           onBlur={(e) => handleUpdate(e, "breakfastPrice")}
//         />
//       </FormRow>
//     </Form>
//   );
// }

// export default UpdateSettingsForm;

import { useState, useEffect } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings,
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  // Local state to hold the form values
  const [formData, setFormData] = useState({});

  // Set initial values when settings are loaded
  useEffect(() => {
    if (settings) {
      setFormData({
        min_booking_length: settings.min_booking_length,
        max_booking_length: settings.max_booking_length,
        max_guests_per_booking: settings.max_guests_per_booking,
        breakfastPrice: settings.breakfastPrice,
      });
    }
  }, [settings]);

  if (isLoading) return <Spinner />;

  // Update local state on input change
  function handleChange(e, field) {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Update all settings at once
    updateSetting(formData);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          value={formData.min_booking_length || ""}
          disabled={isUpdating}
          onChange={(e) => handleChange(e, "min_booking_length")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          value={formData.max_booking_length || ""}
          disabled={isUpdating}
          onChange={(e) => handleChange(e, "max_booking_length")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          value={formData.max_guests_per_booking || ""}
          disabled={isUpdating}
          onChange={(e) => handleChange(e, "max_guests_per_booking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          value={formData.breakfastPrice || ""}
          disabled={isUpdating}
          onChange={(e) => handleChange(e, "breakfastPrice")}
        />
      </FormRow>

      <Button type="submit" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Save Changes"}
      </Button>
    </Form>
  );
}

export default UpdateSettingsForm;
