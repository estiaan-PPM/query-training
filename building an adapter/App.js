import { QueryClient } from "@tanstack/query-core";

$(document).ready(() => {
  const queryClient = new QueryClient();

  $("#app").useQuery({
    queryClient,
    queryOptions: {
      queryKey: ["repoData", "query"],
      queryFn: async () => {
        console.log("fetching...");
        const { data } = await axios.get(
          "https://api.github.com/repos/TanStack/query"
        );
        return data;
      },
      staleTime: 2 * 1000,
    },
    update: (_event, { status, error, data }) => {
      if (status === "pending") {
        $("#app").text("loading...");
      } else if (status === "error") {
        $("#app").text(`Something went wrong: ${error.message}`);
      } else {
        $("#app").text(`${data.name}: ${data.description}`)
      }
    },
  })
})


$.widget("custom.useQuery", {
    _create() {
        this.options.queryClient.mount()
        this._observer = new QueryObserver(     //Step 1: Creating the observer
            this.options.queryClient,
            this.options.queryOptions
        );

        this._unsubscribe = this._observer.subscribe(() => {      //Step 2: Subscribing to the changes in the observer
            const result = this._observer.getCurrentResult();
            this.trigger("update", null, result);   //Step 3: Ensure components update the DOM when a change occurs
        });
    },
    _setOption(key, value) {
        this._super(key, value);

        if(key === "queryOptions") {    
            this._observer.setOptions(value);
        }
    },
    _destroy() {
        this.options.queryClient.unmount()
        this._unsubscribe();
    }
})