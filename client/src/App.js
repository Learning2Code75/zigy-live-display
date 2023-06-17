import "./App.css";
import Root from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./Form/Form";
import Display from "./Display/Display";
import Inputs from "./Inputs/Inputs";
import { createContext, useState } from "react";
import Home from "./Home/Home";

export const MessagesContext = createContext(null);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "form/",
          element: <Form />,
        },
        {
          path: "display/",
          element: <Display />,
        },
        {
          path: "inputs/",
          element: <Inputs />,
        },
      ],
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: "1",
      msg: "",
      placeholder: "Name",
    },
    {
      id: "2",
      msg: "",
      placeholder: "Email",
    },
    {
      id: "3",
      msg: "",
      placeholder: "Phone Number",
    },
    {
      id: "4",
      msg: "",
      placeholder: "Address",
    },
    {
      id: "5",
      msg: "",
      placeholder: "Age",
    },
    {
      id: "6",
      msg: "",
      placeholder: "Feedback",
    },
  ]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </MessagesContext.Provider>
  );
}

export default App;
