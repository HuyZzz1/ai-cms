import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  getListRegionsQuery,
  getListDistrictsQuery,
} from "@/service/api/camera";
import { QueryKey, DEFAULT_FILTER } from "@/service/constant";
import { userRecoil } from "@/service/recoil/user";
import { regionsRecoil, districtsRecoil } from "@/service/recoil/regions";

export function useInitRegionsAndDistricts() {
  const user = useRecoilValue(userRecoil);
  const setRegions = useSetRecoilState(regionsRecoil);
  const setDistricts = useSetRecoilState(districtsRecoil);

  const { data: dataRegions } = useQuery({
    enabled: !!user?.id,
    queryKey: [QueryKey.regions],
    queryFn: () => getListRegionsQuery({ ...DEFAULT_FILTER, limit: 9999 }),
  });

  const { data: dataDistricts } = useQuery({
    enabled: !!user?.id,
    queryKey: [QueryKey.districts],
    queryFn: () => getListDistrictsQuery({ ...DEFAULT_FILTER, limit: 9999 }),
  });

  useEffect(() => {
    if (dataRegions?.data?.docs?.length > 0) {
      setRegions(dataRegions.data.docs);
    }
  }, [dataRegions]);

  useEffect(() => {
    if (dataDistricts?.data?.docs?.length > 0) {
      setDistricts(dataDistricts.data.docs);
    }
  }, [dataDistricts]);
}
