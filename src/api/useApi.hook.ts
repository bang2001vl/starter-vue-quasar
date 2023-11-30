import { ref } from "vue";

type FreeType = { [key: string]: any; [key: number]: any; [key: symbol]: any };
export function useApi<T extends FreeType = {}, D extends FreeType = any>(
  fnCallApi: (payload: D) => Promise<T>
) {
  const data = ref({} as T);
  const call = async (payload: D) => {
    data.value = (await fnCallApi(payload)) as any;
  };
  return {
    data,
    call,
  };
}
