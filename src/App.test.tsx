import React from "react";
import {render, screen} from "@testing-library/react";
import App from './App'

/*
getBy - finds or throws error - for standard use
queryBy - finds or returns null - used to verify that something is not there
findBy - async, finds or throws
*/

//region module mocks
jest.mock("./App", () => {
    return function CarListMock() {
        return (
            <div>CarListMock</div>
        );
    };
});
//endregion

describe('App component test', () => {
    test('Mocked ECarList should be rendered in App', () => {
        render(<App/>);
        expect(screen.getByText('CarListMock')).toBeTruthy();
    });
});