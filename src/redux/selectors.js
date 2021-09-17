import { useSelector } from "react-redux";

function useGlobalState() {
  return useSelector((state) => state);
}

function useDiscover() {
  return useSelector((state) => state.discover);
}

function useFavourute() {
  return useSelector((state) => state.favourite);
}

function useWatchLater() {
  return useSelector((state) => state.watchLater);
}

export { useGlobalState, useDiscover, useFavourute, useWatchLater };
