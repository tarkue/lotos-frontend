export enum Endpoint {
  MY_COURSES = "/catalog/my",
  ALL_COURSES = "/catalog/all",
  LOGIN = "/login",
  REGISTER = "/register",
  FORGET_PASSWORD = "forget-password",
  COURSES = "/catalog/courses",
  PROFILE = "/profile",
  COURSE = `${Endpoint.COURSES}/{}`,
  MODULE = `${Endpoint.COURSE}/{}`,
  MATERIAL = `${Endpoint.MODULE}/{}`,
}
