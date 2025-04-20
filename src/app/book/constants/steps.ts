export const STEP_CONTENT = {
  GETTING_STARTED: {
    title: "Need cleaning? We're here to help",
    steps: [
      {
        number: 1,
        title: "Choose your service",
        description: "Select the cleaning type that best fits your situation and your needs."
      },
      {
        number: 2,
        title: "Tell us about your place",
        description: "Share some basic info and add any notes, photos, or instructions."
      },
      {
        number: 3,
        title: "Book and relax",
        description: "Pick a time that works, confirm details, and we'll handle the rest."
      }
    ]
  },
  CHOOSE_YOUR_SERVICE: {
    title: "Choose your service",
    description: "Let's start with finding the perfect cleaning service for your needs."
  },
  SERVICE_SELECTION: {
    title: "What are we cleaning today?",
    description: "Select the type of cleaning service that best fits your needs. Each option is tailored to different cleaning requirements.",
    options: {
      default: {
        title: "Deep Clean",
        description: "Recommended for places that haven't been professionally cleaned"
      },
      moveInOut: {
        title: "Move In/Out",
        description: "For moving in or out of a property"
      },
      custom: {
        title: "Custom Areas Only",
        description: "For specific areas that need attention"
      },
      mansion: {
        title: "Mansion",
        description: "For large properties with 4+ bedrooms"
      }
    }
  },
  TELL_US_ABOUT_YOUR_PLACE: {
    title: "Tell us about your place",
    description: "In this step, we'll ask for some quick details about your home—like how many bedrooms you have, and what type of cleaning you're looking for."
  },
  SIZE_SELECTION: {
    title: "What is the size of your place?",
    description: "Select the number of bedrooms in your home to help us estimate the service duration and price.",
    options: {
      oneBedroom: {
        title: "One Bedroom",
        description: "Up to 1,000 sq ft"
      },
      twoBedroom: {
        title: "Two Bedroom",
        description: "Up to 1,500 sq ft"
      },
      threeBedroom: {
        title: "Three Bedroom",
        description: "Up to 2,500 sq ft"
      },
      fourBedroom: {
        title: "Four Bedroom",
        description: "Up to 3,500 sq ft"
      }
    }
  },
  HOURS_SELECTION: {
    title: "Select Service Duration",
    description: "Choose how many hours you need for your cleaning service"
  },
  CUSTOMER_DETAILS: {
    title: "Your Information",
    description: "Enter your contact details",
    fields: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number"
    }
  },
  ADDRESS_INPUT: {
    title: "Where is the cleaning?",
    description: "Enter your address to help us find you.",
    fields: {
      address: "Street address",
      apt: "Apt, suite, unit (if applicable)",
      city: "City / town",
      state: "State / territory",
      zipCode: "ZIP code"
    }
  },
  SCHEDULE: {
    title: "Schedule Your Cleaning",
    description: "Select a date, time, and frequency for your service",
    fields: {
      date: "Choose a Date",
      dateDescription: "Select an available date.",
      arrivalWindow: "Arrival Window",
      frequency: "Frequency"
    }
  }
} as const