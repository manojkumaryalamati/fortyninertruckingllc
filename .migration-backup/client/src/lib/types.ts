export interface Truck {
  id?: string;
  truckNo: string;
  vin: string;
  plate: string;
  status: "Active" | "Maintenance" | "Inactive";
  createdAt: any; // Firestore Timestamp or Date
}

export interface Driver {
  id?: string;
  name: string;
  phone: string;
  licenseNo: string;
  status: "Active" | "On Leave" | "Inactive";
  createdAt: any;
}

export interface Trip {
  id?: string;
  truckId: string;
  driverId: string;
  pickup: string;
  drop: string;
  date: string;
  status: "Scheduled" | "In Transit" | "Completed" | "Cancelled";
  createdAt: any;
  rate?: string;
  customer?: string;
  route?: string; // e.g. "Origin -> Destination"
}

export interface Document {
  id?: string;
  type: string;
  ownerType: "truck" | "driver" | "company";
  ownerId?: string;
  fileName: string;
  fileUrl: string;
  createdAt: any;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: "admin" | "driver" | "staff";
  createdAt: any;
}
