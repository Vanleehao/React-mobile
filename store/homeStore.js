import { observable, action } from "mobx"
import Http from '../src/api/Http';
class HomeStore {
	constructor() {

  }
  
	@observable count = 0;
	@observable userIfo = null;

	@action addCount() {
		this.count += 1
	}
	@action lessCount() {
		this.count += -1
	}
	@action getData() {
    Http.getData({}).then((res) => {
			this.userIfo = res.data
		})
	}
}

export default HomeStore;
