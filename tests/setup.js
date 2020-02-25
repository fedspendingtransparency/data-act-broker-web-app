
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Enzyme 3 shallow triggers life cycle methods by default
// Disable this feature to prevent older tests from breaking
configure({ adapter: new Adapter(), disableLifecycleMethods: true });
