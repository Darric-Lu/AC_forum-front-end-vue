<template>
  <div class="container py-5">
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            v-model="newCategroyName"
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
          />
        </div>
        <div class="col-auto">
          <button
            @click.stop.prevent="createCategory(newCategroyName)"
            type="button"
            class="btn btn-primary"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <Spinner v-if="isLoading" />
      <template v-else>
        <thead class="thead-dark">
          <tr>
            <th scope="col" width="60">#</th>
            <th scope="col">Category Name</th>
            <th scope="col" width="210">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <th scope="row">
              {{ category.id }}
            </th>
            <td class="position-relative">
              <div v-show="!category.isEditing" class="category-name">
                {{ category.name }}
              </div>
              <input
                v-show="category.isEditing"
                v-model="category.name"
                type="text"
                class="form-control"
              />
              <span
                @click="handleCancel(category.id)"
                v-show="category.isEditing"
                class="cancel"
              >
                ✕
              </span>
            </td>
            <td class="d-flex justify-content-between">
              <button
                v-show="!category.isEditing"
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="toggleIsEditing(category.id)"
              >
                Edit
              </button>
              <button
                v-show="category.isEditing"
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="updateCategory(category.id, category.name)"
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="deleteCategory(category.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>

<script>
import AdminNav from "../components/AdminNav";
import adminAPI from "../apis/admin";
import Spinner from "../components/Spinner";
import { Toast } from "../utils/helpers";

export default {
  name: "AdminCategories",
  components: {
    AdminNav,
    Spinner,
  },

  data() {
    return {
      newCategroyName: "",
      categories: [],
      isLoading: true,
    };
  },

  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const { data } = await adminAPI.categories.get();
        this.categories = data.categories.map((category) => ({
          ...category,
          isEditing: false,
          nameCached: "",
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法載入餐廳分類，請稍後再試",
        });
      }
    },
    async createCategory(name) {
      try {
        const { data } = await adminAPI.categories.create(name);

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.newCategroyName = "";
        this.fetchCategories();
        Toast.fire({
          icon: "success",
          title: "新增成功",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "目前無法新增餐廳類別",
        });
      }
      this.newCategroyName = "";
    },
    async deleteCategory(categoryId) {
      try {
        const { data } = await adminAPI.categories.delete(categoryId);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
        Toast.fire({
          icon: "success",
          title: "已刪除成功",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法刪除",
        });
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name,
          };
        }
        return category;
      });
    },
    async updateCategory(categoryId, categoryName) {
      try {
        const { data } = await adminAPI.categories.update({
          id: categoryId,
          name: categoryName,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.toggleIsEditing(categoryId);
        Toast.fire({
          icon: "success",
          title: "更新成功",
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "目前無法更新餐廳類別，請稍後再試",
        });
        this.categories = this.categories.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              // 把原本的餐廳類別名稱還回去
              name: category.nameCached,
            };
          }
          return category;
        });

        this.toggleIsEditing(categoryId);
      }
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,

            // 把原本的餐廳類別名稱還回去
            name: category.nameCached,
          };
        }
        return category;
      });

      this.toggleIsEditing(categoryId);
    },
  },
  // watch: {
  //   categories(newValue) {
  //     this.categories = [...this.categories, ...newValue];
  //   },
  // },
};
</script>