export interface Iattendance {
    EmployeeName: string,
    date: string,
    inTime: string,
    outTime: string,
    isfullday?: boolean,
    id?: string
    workHours?: number
}