import 'babel-polyfill';
import './index.css';
import FastClick from 'fastclick';
import dva from 'dva';
import {
  message,notification
} from 'antd';
// 1. Initialize
const app = dva();

// 2. Plugins
app.use({
	onError: (err, dispatch) => {
		//console.log("errrrr: ", err);
		notification.error({
		    message: `请求错误`,
		    description: err,
	    });
	},
});

//app.use(createLoading())
// 3. Model

app.model(require('./models/user'));
app.model(require('./models/setting'));
app.model(require('./models/content'));
app.model(require('./models/data_center'));
app.model(require('./models/finance'));
app.model(require('./models/award'));
app.model(require('./models/app'));
app.model(require('./models/userReward'));
app.model(require('./models/news'));
app.model(require('./models/advert'));
app.model(require('./models/notice'));

// 4. Router
app.router(require('./router'));

// 5. Start
FastClick.attach(document.body);
app.start('#root');