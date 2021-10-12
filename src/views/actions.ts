import {InjectFactory, Middleware, Decorator} from '@mcfed/core';
import {IAction, IApi, IReducer, PK} from './interface';
// import Api from './api';
// import Reducer from './reducer';

const {MiddlewareFactory} = Middleware;
const {Injectable} = InjectFactory;
const {param, loading} = Decorator;

function Reducer(){

}

function Api(){}

// @Injectable
export default class Action implements IAction {
  constructor(
    public readonly reducer: IReducer,
    public readonly api: IApi,
    public readonly middleware: Middleware.MiddlewareFactory
  ) {
    // super(reducer, api, middleware);
  }
    fetchSave(params: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    fetchUpdate(params: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
//   @loading()
  async fetchItem(id:PK):Promise<void>{
    const data = await this.api.fetchItem(id)
    this.middleware.showSuccess(data?.msg)
  }

//   @loading()
  async fetchPage(params:any):Promise<void>{
    const data = await this.api.fetchPage(params);
    // if (data && data.code === 200) {
      console.log(data)
      //@ts-ignore
      this.reducer.saveList({list:data,currentPage:1,total:100})
      this.middleware.showSuccess(data?.msg);
    // } else {
    //   this.middleware.showError(data?.msg);
    // }
  }

//   @loading()
  async fetchDelete(params:any):Promise<void>{
    // const data = await this.api.fetchPage(params);
    // if (data && data.code === 200) {
      console.log("delete")
      //@ts-ignore
      // this.reducer.saveList({list:data,currentPage:1,total:100})
      this.middleware.showSuccess(data?.msg);
    // } else {
    //   this.middleware.showError(data?.msg);
    // }
  }
}
