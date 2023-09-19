<template>
    <!--  -->
    <a-row :gutter="24" class="mt-28" v-if="customForm?.fieldList">
        <a-col :xl="12" :sm="12" :xs="24">
            <div class="left">
                <draggable class="dragArea list-group w-full" :list="customForm?.fieldList" :group="{ name: 'people', pull: 'clone', put: false }" :sort="true" @change="log" :move="checkMove">
                    <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center" v-for="element in customForm?.fieldList" :key="element.id">
                        <label>{{element.name}}</label>
                        <div class="draggable-item">X
                            <!-- <a-input :type="element.type" /> -->
                        </div>
                    </div>
                </draggable>
                <!-- <pre>{{ JSON.stringify(customForm?.fieldList, undefined, 4) }}</pre> -->
            </div>
        </a-col>
        <a-col :xl="12" :sm="12" :xs="24">
            <div class="right" v-if="list2?.length>0">
             <a-col :xl="12" :sm="12" :xs="24" class="drop-zone">
                <draggable class="dragArea list-group w-full" :list="list2" group="people" @change="log" :move="checkMove">
                    <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center" v-for="element,index in list2" :key="index">
                            <div @click="remove1(index)" style="float:right">X</div>
                            <label>{{element.name}}</label>
                            <div class="draggable-item" @click="properties(element.udid)">
                                <a-input :type="element.type" />
                            </div>    
                    </div>
                </draggable>
            </a-col>
            <a-col :xl="12" :sm="12" :xs="24" class="drop-zone">
                <draggable class="dragArea list-group w-full" :list="list3" group="people" @change="log" :move="checkMove">
                    <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center" v-for="element,index in list3" :key="index">
                            <div @click="remove2(index)" style="float:right">X</div>
                            <label>{{element.name}}</label>
                            <div class="draggable-item" @click="properties(element.udid)">
                                <a-input :type="element.type" />
                            </div>    
                    </div>
                </draggable>
            </a-col>      
                <!-- <pre>{{ JSON.stringify(list2, undefined, 4) }}</pre> -->
            </div>
            <div class="right" v-else>
                <div class="">Drag Here</div>
                <a-col :xl="12" :sm="12" :xs="24" class="drop-zone">
                    <draggable class="dragArea list-group w-full drop-zone" :list="list2" group="people" @change="log" :move="checkMove">
                        <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center" v-for="element in list2" :key="element.name">
                            <div @click="remove1(index)" style="float:right">X</div>
                            <label>{{element.name}}</label>
                            <div class="draggable-item" @click="properties(element.udid)">
                                <a-input :type="element.type" />
                            </div>
                        </div>
                    </draggable>
                </a-col>
                <a-col :xl="12" :sm="12" :xs="24" class="drop-zone">
                    <draggable class="dragArea list-group w-full drop-zone" :list="list3" group="people" @change="log" :move="checkMove">
                        <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center" v-for="element in list3" :key="element.name">
                            <div @click="remove2(index)" style="float:right">X</div>
                            <label>{{element.name}}</label>
                            <div class="draggable-item" @click="properties(element.udid)">
                                <a-input :type="element.type" />
                            </div>
                        </div>
                    </draggable>
                </a-col>
            </div>
        </a-col>
    </a-row>
    <a-row :gutter="24" v-if="controlProperties">
        <a-col :xl="12" :sm="12" :xs="24" class="drop-zone">
            <h3>Control properties</h3>
            <a-col :xl="8" :sm="8" :xs="24">
                <label>Rename <Label></Label></label>
                <a-input v-model:value="name" />
                <a-checkbox v-model:checked="checked">Required</a-checkbox>
            </a-col>
            <a-col :xl="12" :sm="12" :xs="24">
                <a-button class="modal-button" @click="close">Close</a-button>
                <a-button class="modal-button" type="primary" @click="update">Update</a-button>
            </a-col>
        </a-col>
    </a-row>
    </template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { useStore } from "vuex";
export default defineComponent({
  name: "Test",
  components: {
    draggable: VueDraggableNext,
  },
  setup() {
    const store = useStore();
    const controlProperties = ref(false);
    const id = ref();
    const name = ref();
    
    const list2 = ref([]);
    const list3 = ref([]);

    onMounted(() => {
      store.dispatch("fieldList");
    });

    const customForm = computed(() => {
      return store.state.customForm;
    });

    const checkMove = (event) => {
      console.log("checkMove", event.draggedContext);
      console.log("Future index: " + event.draggedContext.futureIndex);
    };

    function log(event) {
      const { moved, added } = event;

      if (moved) console.log("moved", moved);
      if (added) console.log("added", added, added.element);
    }

    function properties(value) {
      controlProperties.value = true;
      id.value = value;
    }

    const update = () => {
      // list1.map((item) => {
      //   if (id.value == item.udid) {
      //     return (item.name = name);
      //   } else {
      //     return item;
      //   }
      // });
      controlProperties.value = false;
    };
    const close = () => {
      controlProperties.value = false;
    };

    const remove1 = (value) => {
      let temp = [];
      temp = list2.value;
      list2.value = temp.filter((item, index) => index !== value);
    };

    const remove2 = (value) => {
      let temp = [];
      temp = list3.value;
      list3.value = temp.filter((item, index) => index !== value);
    };

    return {
      remove1,
      remove2,
      name,
      id,
      close,
      update,
      controlProperties,
      customForm,
      checkMove,
      log,
      properties,
      enabled: true,
      // list1,
      list2,
      list3,
      dragging: false,
    };
  },
});
</script>

<style>
.draggable-item {
  display: flex;
  justify-content: center;
  background-color: lightblue;
  box-shadow: 0px 2px 5px #aaa;
  margin: 1%;
  padding: 2%;
}

.drop-zone {
  display: flex;
  flex-direction: column;
  background-color: #daeedb;
  box-shadow: 0px 3px 5px #aaa;
  margin: 30px;
  padding: 10px;
  width: 600px;
  height: 300px;
}

pre {
  background-color: #eee;
  margin: 30px;
  padding: 10px;
  width: 400px;
  min-height: 200px;
}
</style>
