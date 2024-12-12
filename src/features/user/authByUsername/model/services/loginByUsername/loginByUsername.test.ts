import axios, { AxiosStatic } from "axios";
import { loginByUsername } from ".";
import { userActions } from "entities/user/model/slice";
import { TestAsyncThunk } from "shared/configs/tests/testAsyncThunk";

jest.mock("axios");

const mockedAxios: jest.MockedFunctionDeep<AxiosStatic> = jest.mocked(axios, {
   shallow: false,
});

describe("loginByUsername.test", () => {
   // let dispatch: Dispatch;
   // let getState: () => StateSchema;
   //
   // beforeEach(() => {
   //     dispatch = jest.fn();
   //     getState = jest.fn();
   // });

   //    test('success login', async () => {
   //        const userValue = { username: '123', id: '1' };
   //        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })); // задаем 200 статус со всеми успешно полученными данными
   //        const action = loginByUsername({ username: '123', password: '123' }); // создаем asyncThunk
   //        const result = await action(dispatch, getState, undefined); // так выглядит пример result

   //     //   {
   //     //  type: 'login/loginByUsername/fulfilled',
   //     //  payload: {username:'123', id:'1'},
   //     //  meta:{
   //     //     arg: { username:'123', password:'123'},
   //     //     requestId: 'uzu8PIqn1lwaKhakHTo0B9',
   //     //     requestStatus: 'fulfilled'
   //     //  }
   //     //   }

   //        expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)); // проверка, что action вызвался
   //        expect(dispatch).toHaveBeenCalledTimes(3); // проверка на вызов диспача 3 раза при успешном результате работы action
   //        expect(mockedAxios.post).toHaveBeenCalled(); // проверка на наличие самого вызова метода mockedAxios.post
   //        expect(result.meta.requestStatus).toBe('fulfilled'); // проверка, что экшен успешно отработал
   //        expect(result.payload).toEqual(userValue); проверка, что экшен имеет поле payload: {username:'123', id:'1'},
   //    });
   //
   // test('error login', async () => {
   //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 })); // задаем 403 статус
   //     const action = loginByUsername({ username: '123', password: '123' }); // создаем asyncThunk
   //     const result = await action(dispatch, getState, undefined); // пример неудачно выполненого action
   //
   //     expect(dispatch).toHaveBeenCalledTimes(2); // проверка на вызов диспача 2 раза при  результате работы action c ошибкой
   //     expect(mockedAxios.post).toHaveBeenCalled(); // проверка на наличие самого вызова метода mockedAxios.post
   //     expect(result.meta.requestStatus).toBe('rejected');// проверка, что экшен отработал не успешно
   //     expect(result.payload).toBe('введены не корректные данные'); проверка, что экшен имеет поле payload: 'введены не корректные данные',
   // });

   test("success login", async () => {
      const userValue = { username: "123", id: "1" };
      mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

      const thunk = new TestAsyncThunk(loginByUsername); //используем класс TestAsyncThunk, передаем в конструктор loginByUsername - то есть CreateAsyncThunk
      const result = await thunk.callThunk({  // вызываем асинхронный action и сохраняем результат 
         username: "123",
         password: "123",
      });

      expect(thunk.dispatch).toHaveBeenCalledWith(
         userActions.setAuthData(userValue)
      );
      expect(thunk.dispatch).toHaveBeenCalledTimes(3);
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result.meta.requestStatus).toBe("fulfilled");
      expect(result.payload).toEqual(userValue);
   });

   test("error login", async () => {
      mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
      const thunk = new TestAsyncThunk(loginByUsername);
      const result = await thunk.callThunk({
         username: "123",
         password: "123",
      });

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result.meta.requestStatus).toBe("rejected");
      expect(result.payload).toBe("введены не корректные данные");
   });
});
