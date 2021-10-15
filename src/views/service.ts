import { Injectable } from "@mcfed/core/dist/InjectFactory";

export interface IService{
    fetchPage(params: any): Promise<void>;
}

@Injectable
class  AAService implements IService{
    // constructor(aApi:IAPI)
    fetchPage(params: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
}