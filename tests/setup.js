
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// Enzyme 3 shallow triggers life cycle methods by default
// Disable this feature to prevent older tests from breaking
configure({ adapter: new Adapter(), disableLifecycleMethods: true });
