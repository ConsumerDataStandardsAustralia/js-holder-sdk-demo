export interface Endpoint {
    requestType: string,
    requestPath: string,
    minSupportedVersion: number,
    maxSupportedVersion: number
}