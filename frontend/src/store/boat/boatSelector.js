import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.boats.loading;
const selectBoats = (state) => state.boats.boats;
const selectBoatDetail = (state) => state.boats.boatDetail;
const selectTypes = (state) => state.boats.types;
const selectModels = (state) => state.boats.models;
const selectCities = (state) => state.boats.cities;

const selectBoatData = createSelector(
    [selectLoading, selectBoats, selectBoatDetail, selectTypes, selectModels, selectCities],
    (loading, boats, boatDetail, types, models, cities) => ({ loading, boats, boatDetail, types, models, cities })
);

export default selectBoatData;