<script>
    import { goto, stores } from '@sapper/app';
	import { onMount } from "svelte";
    import {authStore} from "../../stores/auth.store";

    onMount( async () => {
      try {
          await authStore.handleRedirectCallback(window.location.search);
      } catch (e) {
        alert('Something happened. Please try again.')
      }
        goto('/')
    })
</script>
<style>

</style>
