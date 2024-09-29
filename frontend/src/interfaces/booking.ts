export interface Passenger {
    FirstName?: string;
    LastName?: string;
    Gender?: string;
    BirthDay?: string;
    Email?: string;
    Phone?: string;
    PassportNumber?: string;
    PassportDate?: string;
}

export interface Baggage {
    Weight?: number;
    Price?: number;
}

export interface FlightDetails {
    flightAndFlightDetailsID?: number;
}

export interface BookingPassenger {
    passenger?: Passenger;
}

export interface BookingBaggage {
    baggage?: Baggage;
}

export interface Booking {
    TotalPrice?: number;
    bookingPassenger?: BookingPassenger[];
    bookingBaggage?: BookingBaggage[];
    bookingFlightAndFlightDetails?: FlightDetails[];
}

export interface HeaderProps {
    initialState: {
      from: string;
      to: string;
      departDate: string;
      returnDate: string | null;
      flightClass: string;
      numberPassenger: number;
    };
    onSubmit: (searchData: {
      from: string;
      to: string;
      departDate: string;
      returnDate: string | null;
      flightClass: string;
      numberPassenger: number;
    }) => void;
  }