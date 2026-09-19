
// Existing Dataset
const bookings = [
  {
    bookingId: 1,
    customerName: "Rahul",
    eventName: "Angular Summit",
    tickets: 2,
    ticketPrice: 500,
    attended: true
  },
  {
    bookingId: 2,
    customerName: "Priya",
    eventName: "NodeJS Bootcamp",
    tickets: 1,
    ticketPrice: 700,
    attended: false
  },
  {
    bookingId: 3,
    customerName: "Arun",
    eventName: "Angular Summit",
    tickets: 3,
    ticketPrice: 500,
    attended: true
  },
  {
    bookingId: 4,
    customerName: "Divya",
    eventName: "React Conference",
    tickets: 4,
    ticketPrice: 600,
    attended: true
  }
];

// Helper: Calculate Event Revenues
const getEventRevenues = (bookings) => {
  const revenueMap = {};
  bookings.forEach(booking => {
    const revenue = booking.tickets * booking.ticketPrice;
    revenueMap[booking.eventName] = (revenueMap[booking.eventName] || 0) + revenue;
  });
  return revenueMap;
};

// Requirement 1: Generate Event Revenue Report
const generateRevenueReport = (bookings) => {
  const revenueMap = getEventRevenues(bookings);
  for (const [event, revenue] of Object.entries(revenueMap)) {
    console.log(`${event} : ${revenue}`);
  }
  return revenueMap;
};

// Requirement 2: Generate Top Revenue Event
const generateTopRevenueEvent = (bookings) => {
  const revenueMap = getEventRevenues(bookings);
  let topEvent = "";
  let maxRevenue = -1;

  for (const [event, revenue] of Object.entries(revenueMap)) {
    if (revenue > maxRevenue) {
      maxRevenue = revenue;
      topEvent = event;
    }
  }

  console.log(`Top Revenue Event:${topEvent}`);
  console.log(`Revenue: ${maxRevenue}`);
  return { event: topEvent, revenue: maxRevenue };
};

// Requirement 3: Generate Attendance Percentage
const generateAttendanceReport = (bookings) => {
  const totalBookings = bookings.length;
  if (totalBookings === 0) return 0;
  
  const attendedBookings = bookings.filter(b => b.attended).length;
  const percentage = Number(((attendedBookings / totalBookings) * 100).toFixed(2));
  
  console.log(`Attendance Percentage: ${percentage}%`);
  return percentage;
};

// Requirement 4: Generate Customer Spending Report
const generateCustomerSpendingReport = (bookings) => {
  const spendingMap = {};
  bookings.forEach(booking => {
    const spending = booking.tickets * booking.ticketPrice;
    spendingMap[booking.customerName] = (spendingMap[booking.customerName] || 0) + spending;
  });

  for (const [customer, spending] of Object.entries(spendingMap)) {
    console.log(`${customer} : ${spending}`);
  }
  return spendingMap;
};

// Requirement 5: Generate VIP Customers (Spending >= 1500)
const generateVipCustomers = (bookings) => {
  const spendingMap = {};
  bookings.forEach(booking => {
    const spending = booking.tickets * booking.ticketPrice;
    spendingMap[booking.customerName] = (spendingMap[booking.customerName] || 0) + spending;
  });

  const vipList = [];
  for (const [customer, spending] of Object.entries(spendingMap)) {
    if (spending >= 1500) {
      vipList.push(customer);
      console.log(customer);
    }
  }
  return vipList;
};

// Requirement 6: Add Booking Validation
const validateBooking = (booking) => {
  const errors = [];

  if (!booking.customerName || typeof booking.customerName !== "string" || booking.customerName.trim() === "") {
    errors.push("Customer Name Required");
  }

  if (typeof booking.tickets !== "number" || booking.tickets <= 0) {
    errors.push("Invalid Ticket Count");
  }

  if (!booking.ticketPrice || typeof booking.ticketPrice !== "number" || booking.ticketPrice <= 0) {
    errors.push("Ticket Price Required");
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Requirement 7: Generate Analytics Dashboard Object
const generateDashboard = (bookings) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.tickets * b.ticketPrice), 0);
  const totalBookings = bookings.length;
  const totalAttendees = bookings.filter(b => b.attended).length;
  const attendancePercentage = Number(((totalAttendees / totalBookings) * 100).toFixed(2));
  
  const revenueMap = getEventRevenues(bookings);
  let topEvent = "";
  let maxRevenue = -1;
  for (const [event, revenue] of Object.entries(revenueMap)) {
    if (revenue > maxRevenue) {
      maxRevenue = revenue;
      topEvent = event;
    }
  }
  const spendingMap = {};
  bookings.forEach(b => {
    spendingMap[b.customerName] = (spendingMap[b.customerName] || 0) + (b.tickets * b.ticketPrice);
  });
  const vipCustomers = Object.entries(spendingMap)
    .filter(([customer, spending]) => spending >= 1500)
    .map(([customer]) => customer);
  return {
    totalRevenue,
    totalBookings,
    totalAttendees,
    attendancePercentage,
    topRevenueEvent: topEvent,
    vipCustomers
  };
};

// Execution 
console.log(" Requirement 1: Event Revenue Report ");
generateRevenueReport(bookings);

console.log("\n Requirement 2: Top Revenue Event ");
generateTopRevenueEvent(bookings);

console.log("\n Requirement 3: Attendance Percentage ");
generateAttendanceReport(bookings);

console.log("\n Requirement 4: Customer Spending Report ");
generateCustomerSpendingReport(bookings);

console.log("\n Requirement 5: VIP Customers ");
generateVipCustomers(bookings);

console.log("\n Requirement 6: Booking Validation Test ");
const invalidBooking = {
  bookingId: 10,
  customerName: "",
  tickets: -2,
  ticketPrice: null
};
console.log(validateBooking(invalidBooking));

console.log("\n Requirement 7: Analytics Dashboard Object ");
console.log(generateDashboard(bookings));