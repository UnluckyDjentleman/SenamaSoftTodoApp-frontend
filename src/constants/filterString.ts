import { Status } from "./status";

interface FilterString{
    from: Date|undefined,
    to: Date|undefined,
    status: Status|undefined,
}

export default FilterString