import {
  FETCH_FOODS,
  FETCH_FOODS_LOADING,
  FETCH_FOODS_DETAILS,
  FETCH_CATEGORIES,
  FETCH_CATEGORY_DETAIL,
} from "./actionType";
import { BASE_URL } from "../../config/api";
import { toast } from "../../utils/toast";

let access_token = localStorage.getItem("access_token");

// FOODS
export const fetchFoodsLoading = (payload) => {
  return {
    type: FETCH_FOODS_LOADING,
    payload,
  };
};

export const fetchFoodsDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await fetch(`${BASE_URL}/food/${id}`, {
        method: "GET",
        headers: {
          access_token,
        },
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      dispatch({
        type: FETCH_FOODS_DETAILS,
        payload: responseJSON,
      });
    } catch (error) {
      let errorMessage = error.message;

      toast(errorMessage, "error");
      throw error;
    }
  };
};

export const fetchFoods = () => {
  return async function (dispatch) {
    try {
      dispatch(fetchFoodsLoading(true));
      const response = await fetch(`${BASE_URL}/food`, {
        method: "GET",
        headers: {
          access_token,
        },
      });
      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      dispatch({
        type: FETCH_FOODS,
        payload: responseJSON,
      });
    } catch (error) {
      let errorMessage = error.message;
      toast(errorMessage, "error");
      throw error;
    } finally {
      dispatch(fetchFoodsLoading(false));
    }
  };
};

export const addFoods = (payload, payload2) => {
  return async function (dispatch) {
    try {
      payload.ingredients = payload2;

      const response = await fetch(`${BASE_URL}/food`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token,
        },
        body: JSON.stringify(payload),
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      toast(responseJSON.message, "success");
      dispatch(fetchFoods());
    } catch (error) {
      let errorMessage = error.message;

      // handle kalo ada multiple error
      if (typeof error.message === "object") {
        errorMessage = error.message.join("\n\n");
      }
      toast(errorMessage, "error");
      throw error;
    }
  };
};

export const editFoods = (payload, id) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/food/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token,
        },
        body: JSON.stringify(payload),
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      toast(responseJSON.message, "success");
    } catch (error) {
      let errorMessage = error.message;

      if (typeof error.message === "object") {
        errorMessage = error.message.join("\n\n");
      }
      toast(errorMessage, "error");
      throw error;
    }
  };
};

export const deleteFoods = (id) => {
  return async function (dispatch) {
    try {
      const response = await fetch(`${BASE_URL}/food/${id}`, {
        method: "DELETE",
        headers: {
          access_token,
        },
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      toast(responseJSON.message, "success");

      dispatch(fetchFoods());
    } catch (error) {
      let errorMessage = error.message;
      toast(errorMessage, "error");
    }
  };
};

// CATEGORIES
export function fetchCategories() {
  return async function (dispatch) {
    try {
      const response = await fetch(`${BASE_URL}/category`, {
        method: "GET",
        headers: {
          access_token,
        },
      });
      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      dispatch({
        type: FETCH_CATEGORIES,
        payload: responseJSON,
      });
    } catch (error) {
      let errorMessage = error.message;
      toast(errorMessage, "error");
      throw error;
    }
  };
}

export function fetchCategoryDetail(id) {
  return async function (dispatch) {
    try {
      const response = await fetch(`${BASE_URL}/category/${id}`, {
        method: "GET",
        headers: {
          access_token,
        },
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      dispatch({
        type: FETCH_CATEGORY_DETAIL,
        payload: responseJSON,
      })

    } catch (error) {
      let errorMessage = error.message;
      toast(errorMessage, "error");
      throw error;
    }
  };
}

export function addCategory(payload) {
  return async function (dispatch) {
    try {
      const insertCategory = {
        name: payload,
      };

      const response = await fetch(`${BASE_URL}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token,
        },
        body: JSON.stringify(insertCategory),
      });

      const responseJSON = await response.json();

      toast(responseJSON.message, "success");
      dispatch(fetchCategories());
    } catch (error) {
      let errorMessage = error.message;
      toast(errorMessage, "error");
      throw error;
    }
  };
}

export function editCategory(payload, id) {
  return async function () {
    try {
      const insertCategory = {
        name: payload
      }

      const response = await fetch(`${BASE_URL}/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token,
        },
        body: JSON.stringify(insertCategory),
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      toast(responseJSON.message, "success");
    } catch (error) {
      let errorMessage = error.message;
      toast(errorMessage, "error");
    }
  };
}

export function deleteCategory(id) {
  return async function (dispatch) {
    try {
      const response = await fetch(`${BASE_URL}/category/${id}`, {
        method: "DELETE",
        headers: {
          access_token,
        },
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      toast(responseJSON.message, "success");
      dispatch(fetchCategories());
    } catch (error) {
      let errorMessage = error.message;
      toast(errorMessage, "error");
    }
  };
}

// USERS
export function addUser(payload) {
  return async function () {
    try {
      payload.role = "Staff";

      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token,
        },
        body: JSON.stringify(payload),
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      toast(responseJSON.message, 'success')
    } catch (error) {
      let errorMessage = error.message;

      if (typeof error.message === "object") {
        errorMessage = error.message.join("\n\n");
      }

      toast(errorMessage, "error");
      throw error;
    }
  };
}

export function login(payload) {
  return async function () {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      localStorage.setItem("access_token", responseJSON.access_token);
      localStorage.setItem("role", responseJSON.role);
      access_token = responseJSON.access_token;
      toast(`Welcome!`, "success");
    } catch (error) {
      let errorMessage = error.message;
      toast(errorMessage, "error");
      throw error;
    }
  };
}
