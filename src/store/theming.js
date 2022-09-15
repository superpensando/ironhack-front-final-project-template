// /store/theming.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useThemingStore = defineStore("theming", {
  state: () => ({
    theming: null,
  }),
  actions: {
    async fetchTheming(userID) {
        const { data: theming } = await supabase
        .from("theming")
        .select("theme")
        .match({ user_id: userID });
      this.theming = theming;
      //console.log(theming);
    },
    async editTheming (userID, themingTheme) {
      await supabase
        .from("theming")
        .update({ theme: themingTheme })
        .match({ user_id: userID });
    },
  },
});
