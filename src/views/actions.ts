import { InjectFactory, Middleware, Decorator } from '@mcfed/core';
import { mock } from 'mockjs';
import { IAction, IApi, IReducer, PK } from './interface';
// import Api from './api';
// import Reducer from './reducer';

const { MiddlewareFactory } = Middleware;
const { Injectable } = InjectFactory;
const { param, loading } = Decorator;

function Reducer() {

}

class Api {
  fetchPage(params: any) {
    const mockjson = {
      "data|200": [{
        id: "@id",
        name: "@cname",
        datasource: "@pick(['oracle','mysql','pg'])",
        ip: "@ip",
        port: "@integer(1024,65535)",
        statue: "@boolean"
      }]
    }
    return mock(mockjson)
  }
  fetchItem(params: any) {
    const mockjson = {
      "data": {
        id: "@id",
        name: "@cname",
        datasource: "@pick(['oracle','mysql','pg'])",
        ip: "@ip",
        port: "@integer(1024,65535)",
        statue: "@boolean"
      }
    }
    return mock(mockjson)
  }
}

@Injectable
export default class AAAction implements IAction {
  constructor(
    private readonly api: Api,
  ) {
    //@ts-ignore
    // super(api);
  }
  async fetchPage(params: any): Promise<void> {
    // this.api.fetchPage({a:1})
    // throw new Error('Method not implemented.');
  }
  fetchItem(id: PK): Promise<void> {
    throw new Error('Method not implemented.');
  }
  fetchDelete(ids: PK | PK[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  fetchSave(params: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  fetchUpdate(params: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
