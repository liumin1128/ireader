import dva from 'dva';
import createLoading from 'dva-loading';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'sweetalert/dist/sweetalert.css';
import './index.css';

injectTapEventPlugin();


// 1. Initialize
const app = dva();

app.model(require('./models/bookStore'));

app.model(require("./models/bookShelf"));

app.model(require('./models/bookReader'));

app.model(require('./models/bookDetail'));

// 2. Plugins
// app.use({});
app.use(createLoading());
// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
