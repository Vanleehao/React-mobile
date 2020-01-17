import HomeStore from "./homeStore"
import MyStore from "./myStore"

export const createStore = ()=>({
  HomeStore: new HomeStore,
    MyStore: new MyStore
})