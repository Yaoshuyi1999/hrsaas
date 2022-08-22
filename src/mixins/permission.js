import permissionPoint from "@/constant/permission";
export default{
    data () {
        return {
            point:permissionPoint
        }
    },
    methods: {
        isHas(val) {
            return this.$store.state.permission.points.includes(val);
          },
    }
}