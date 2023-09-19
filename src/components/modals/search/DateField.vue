<template>
  <a-date-picker :placeholder="placeholderData?placeholderData:'Ex - Jan 01, 2000'" 
  :disabledDate="disabledDateData" 
  @change="changedValue" 
  :value="value" 
  :format="globalDateFormat?globalDateFormat:'DD, MMM YYYY'" 
  :value-format="globalDateFormat?globalDateFormat:`YYYY-MM-DD`" 
  :size="size" 
  style="width: 100%" 
  />
</template>

<script>
  import { ref } from 'vue';
export default {
    props:{
    placeholderData:String,
    disabledDateData:String,
    globalDateFormat:String,
    size:Number,
  },
  setup(props, { emit }) {
    const handleChange = () => {
      emit('change')
    }

    return {
      value: ref(undefined),
      handleChange,
    };
  },

}
</script>
