import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// The reason we call this file setupTests
// is because jest will look for this file and run it before executting other code
// We use Enzyme to configure our tests

Enzyme.configure({ adapter: new Adapter() });