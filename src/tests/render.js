import { render } from "@testing-library/react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

function customRender(ui, options) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}
export * from "@testing-library/react";
export { customRender as render };
