import {createSelectorCreator, defaultMemoize} from "reselect";
import _ from "lodash";
import isEqual from "lodash.isequal";

export const deepEqualitySelector = ({fn, combiner = _.identity}) => createSelectorCreator(
    defaultMemoize,
    isEqual
)(fn, combiner)
