<template>
  <div class="container py-5">
    <AdminNav />
    <!-- AdminNav Component -->
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>
            <span v-if="user.isAdmin">admin</span>
            <span v-else>user</span>
          </td>
          <td v-if="!user.mainAdmin">
            <button
              @click.stop.prevent="toggleUserRole(user.id)"
              v-if="user.isAdmin"
              type="button"
              class="btn btn-link"
            >
              set as user
            </button>
            <button
              @click.stop.prevent="toggleUserRole(user.id)"
              v-else
              type="button"
              class="btn btn-link"
            >
              set as admin
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import AdminNav from "../components/AdminNav";

const dummyData = {
  users: [
    {
      id: 1,
      name: "roo00t",
      email: "root@example.com",
      password: "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
      isAdmin: true,
      image: "https://i.imgur.com/3keAGHT.jpeg",
      createdAt: "2020-12-15T06:35:43.000Z",
      updatedAt: "2021-01-14T16:20:50.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
      isAdmin: false,
      image: "https://i.imgur.com/PhcKzNf.jpeg",
      createdAt: "2020-12-15T06:35:43.000Z",
      updatedAt: "2021-01-15T17:07:09.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$IgMneSD6HZiHt0C6we./cOPyq70YhAWNZEqC4YTtJHK8ejgS1J/3q",
      isAdmin: false,
      image: null,
      createdAt: "2020-12-15T06:35:43.000Z",
      updatedAt: "2020-12-15T06:35:43.000Z",
    },
    {
      id: 7,
      name: "123",
      email: "ben7152000@gmail.com",
      password: "$2a$10$gEUc6f3gn62yaOuq89gQLeUr4FbzGkVyMegUmbvPLEMi4Co76LXni",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-12T09:16:05.000Z",
      updatedAt: "2021-02-12T09:16:05.000Z",
    },
    {
      id: 17,
      name: "sa",
      email: "123@gmail.com",
      password: "$2a$10$7b76MIBXCOZwWQ0Idm1Ul.HKChUtn/.IjTAHkNMZRI/t//tvbREca",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-13T07:41:08.000Z",
      updatedAt: "2021-02-13T07:41:08.000Z",
    },
    {
      id: 27,
      name: "root",
      email: "root",
      password: "$2a$10$0tt4RHOVuM./uXJpobmPa.ypCUSn8sHT7QnsQX73K6IUK1RtqEqTu",
      isAdmin: false,
      image: null,
      createdAt: "2021-02-19T03:51:00.000Z",
      updatedAt: "2021-02-19T03:51:00.000Z",
    },
  ],
};
const dummyUser = {
  profile: {
    id: 1,
    name: "roo00t",
    email: "root@example.com",
    password: "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
    isAdmin: true,
    image: "https://i.imgur.com/3keAGHT.jpeg",
    createdAt: "2020-12-15T06:35:43.000Z",
    updatedAt: "2021-01-14T16:20:50.000Z",
    Comments: [
      {
        id: 8,
        text: "Sit ducimus nostrum necessitatibus.",
        UserId: 1,
        RestaurantId: 8,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 8,
          name: "Louisa Cummerata MD",
          tel: "1-734-755-5111 x47387",
          address: "6622 Johnson Wall",
          opening_hours: "08:00",
          description: "Nostrum magni sit.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=32.944417729082055",
          viewCounts: 15,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-02-21T11:15:43.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 12,
        text: "Libero ut iste inventore dicta vel aut aliquam sed.",
        UserId: 1,
        RestaurantId: 12,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 12,
          name: "Merl Wolf",
          tel: "1-848-603-6470 x7813",
          address: "0233 Lura Bridge",
          opening_hours: "08:00",
          description: "Facilis aspernatur sint odit deleniti et.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=70.10281112790923",
          viewCounts: 1,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-02-19T06:25:53.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 14,
        text: "Dolorem ducimus voluptatibus qui molestias.",
        UserId: 1,
        RestaurantId: 14,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 14,
          name: "Maud Quitzon",
          tel: "1-381-928-4146 x7139",
          address: "4710 Turcotte Falls",
          opening_hours: "08:00",
          description: "rerum ipsa sint",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=24.63607690617653",
          viewCounts: 6,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-01-08T18:27:35.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 23,
        text: "Aperiam explicabo omnis iste aut sint.",
        UserId: 1,
        RestaurantId: 23,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 23,
          name: "Al Lakin",
          tel: "602-151-7956",
          address: "37069 Alberta Overpass",
          opening_hours: "08:00",
          description:
            "Voluptates similique quod eos unde illum id qui voluptas exercitationem. Fuga autem quisquam odit quam qui dolores temporibus tenetur. Velit eveniet modi itaque quaerat. Fugiat expedita sit vel fugiat fugiat ut cumque optio sit. Necessitatibus repudiandae quam. Modi et itaque aut aspernatur molestiae.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=50.73691514360379",
          viewCounts: 1,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-01-08T11:36:13.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 28,
        text: "Similique rem sunt et numquam laudantium beatae saepe.",
        UserId: 1,
        RestaurantId: 28,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 28,
          name: "Darrion Heaney",
          tel: "321.110.3263 x381",
          address: "02721 Sarai Estates",
          opening_hours: "08:00",
          description: "Omnis nam qui a quam similique quaerat quaerat et rem.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=65.6301461653418",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 30,
        text: "Perferendis molestiae quam et eveniet ipsum aut.",
        UserId: 1,
        RestaurantId: 30,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 30,
          name: "Adella Beier",
          tel: "1-783-490-1787 x9508",
          address: "601 Sarina Station",
          opening_hours: "08:00",
          description:
            "Sed harum soluta illo eum commodi numquam. Tempore in tempore eum sunt aperiam cum optio. Debitis eos voluptatem vitae omnis tenetur voluptatem. Praesentium molestias sed aspernatur quo quis et dolore aut accusamus. Necessitatibus cumque blanditiis occaecati similique ex fugiat dolores distinctio.\n \rRem dolorem voluptatem dolor odio officia. Unde totam sed laborum cum. Voluptates et nihil sit ab. Voluptatem dolores nam et velit corporis rerum non reiciendis. Rerum accusamus blanditiis sequi aut asperiores quas quo.\n \rAutem omnis totam ut. Sit sed doloremque impedit quos quia quo illo perferendis. Atque maiores dolor. Debitis officiis est et aut quisquam aut debitis. Eligendi iure ut. Qui quaerat aspernatur corporis saepe omnis repudiandae repudiandae.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=48.463502950499326",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 33,
        text: "Maiores aut dolorem deleniti delectus quaerat omnis.",
        UserId: 1,
        RestaurantId: 33,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 33,
          name: "Darrell Heathcote",
          tel: "(082) 347-8052 x78579",
          address: "468 Brooks Shoal",
          opening_hours: "08:00",
          description: "voluptas voluptate laboriosam",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=24.94089318572208",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 36,
        text: "Enim ea facilis.",
        UserId: 1,
        RestaurantId: 36,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 36,
          name: "Abel Rogahn IV",
          tel: "933-901-1731 x269",
          address: "38490 Hickle Fork",
          opening_hours: "08:00",
          description: "dolor",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=44.715555525014935",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 47,
        text: "Adipisci tempora numquam.",
        UserId: 1,
        RestaurantId: 47,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 47,
          name: "Oren Mraz DVM",
          tel: "144-372-2263 x314",
          address: "71871 Adah Via",
          opening_hours: "08:00",
          description: "laudantium",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=5.416043775162582",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 58,
        text: "Minus omnis vitae in non ipsum tenetur autem quisquam.",
        UserId: 1,
        RestaurantId: 8,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 8,
          name: "Louisa Cummerata MD",
          tel: "1-734-755-5111 x47387",
          address: "6622 Johnson Wall",
          opening_hours: "08:00",
          description: "Nostrum magni sit.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=32.944417729082055",
          viewCounts: 15,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-02-21T11:15:43.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 65,
        text: "Sit distinctio quos animi.",
        UserId: 1,
        RestaurantId: 15,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 15,
          name: "Christopher Nienow",
          tel: "960.013.0776 x727",
          address: "81586 Mathilde Greens",
          opening_hours: "08:00",
          description: "et",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=99.53990579386272",
          viewCounts: 14,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-01-09T14:38:50.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 66,
        text: "Architecto cum vel aut quis voluptatum.",
        UserId: 1,
        RestaurantId: 16,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 16,
          name: "Syble Abbott",
          tel: "017.576.7286",
          address: "7407 Schuppe Wall",
          opening_hours: "08:00",
          description:
            "Et temporibus doloribus qui est tempora est. Et consectetur assumenda quia minima suscipit. Sint vero consequatur cum ullam suscipit numquam. Harum et consectetur. Ut dolorem quam.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=24.87564642221516",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 67,
        text: "Est sit aperiam eveniet qui.",
        UserId: 1,
        RestaurantId: 17,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 17,
          name: "Miss Stephen Sawayn",
          tel: "1-935-583-1943 x8155",
          address: "3077 Darrion Wells",
          opening_hours: "08:00",
          description: "officiis voluptatem placeat",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=12.52831928971565",
          viewCounts: 1,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-01-10T17:06:19.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 68,
        text: "Et quia quae quaerat.",
        UserId: 1,
        RestaurantId: 18,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 18,
          name: "Alverta Kiehn",
          tel: "(566) 311-3714",
          address: "500 Lind Pass",
          opening_hours: "08:00",
          description: "Labore unde itaque sequi amet similique commodi.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=2.2037785436574087",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 69,
        text: "Ipsum at vero reiciendis voluptatem et quis.",
        UserId: 1,
        RestaurantId: 19,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 19,
          name: "Trycia Brakus",
          tel: "722-709-6029",
          address: "979 Savion Plaza",
          opening_hours: "08:00",
          description:
            "Et suscipit fuga qui ut alias. Minima perspiciatis dolorem ut et voluptas amet et consequatur. Minus amet totam veritatis et animi eveniet doloremque. Ipsum impedit iure ab quo ipsam doloremque consequuntur cum. Sed in vero magni ut et quod quod quos.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=95.02043508160996",
          viewCounts: 1,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-01-13T11:31:06.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 73,
        text: "Distinctio inventore sit incidunt.",
        UserId: 1,
        RestaurantId: 23,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 23,
          name: "Al Lakin",
          tel: "602-151-7956",
          address: "37069 Alberta Overpass",
          opening_hours: "08:00",
          description:
            "Voluptates similique quod eos unde illum id qui voluptas exercitationem. Fuga autem quisquam odit quam qui dolores temporibus tenetur. Velit eveniet modi itaque quaerat. Fugiat expedita sit vel fugiat fugiat ut cumque optio sit. Necessitatibus repudiandae quam. Modi et itaque aut aspernatur molestiae.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=50.73691514360379",
          viewCounts: 1,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-01-08T11:36:13.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 79,
        text: "Omnis consectetur numquam qui non omnis aut quia et veritatis.",
        UserId: 1,
        RestaurantId: 29,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 29,
          name: "Heidi Hills",
          tel: "990.448.8313 x28638",
          address: "754 Myah Spurs",
          opening_hours: "08:00",
          description:
            "Atque quis autem et quod ea maiores.\nVoluptatem similique sit aliquid omnis rem et.\nAut aperiam est quod quibusdam qui.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=9.31146126664737",
          viewCounts: 1,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-02-18T13:59:48.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 80,
        text: "Quis architecto harum natus.",
        UserId: 1,
        RestaurantId: 30,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 30,
          name: "Adella Beier",
          tel: "1-783-490-1787 x9508",
          address: "601 Sarina Station",
          opening_hours: "08:00",
          description:
            "Sed harum soluta illo eum commodi numquam. Tempore in tempore eum sunt aperiam cum optio. Debitis eos voluptatem vitae omnis tenetur voluptatem. Praesentium molestias sed aspernatur quo quis et dolore aut accusamus. Necessitatibus cumque blanditiis occaecati similique ex fugiat dolores distinctio.\n \rRem dolorem voluptatem dolor odio officia. Unde totam sed laborum cum. Voluptates et nihil sit ab. Voluptatem dolores nam et velit corporis rerum non reiciendis. Rerum accusamus blanditiis sequi aut asperiores quas quo.\n \rAutem omnis totam ut. Sit sed doloremque impedit quos quia quo illo perferendis. Atque maiores dolor. Debitis officiis est et aut quisquam aut debitis. Eligendi iure ut. Qui quaerat aspernatur corporis saepe omnis repudiandae repudiandae.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=48.463502950499326",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 82,
        text: "Aut vero possimus fugit aut eum eveniet incidunt.",
        UserId: 1,
        RestaurantId: 32,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 32,
          name: "Ismael Davis",
          tel: "(910) 474-5755",
          address: "85565 Devon Vista",
          opening_hours: "08:00",
          description:
            "Rerum ea eum eaque eum sit sint exercitationem. Quia quas velit soluta dolore eius rerum consequatur.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=42.23235299994717",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 90,
        text: "Modi earum quasi id.",
        UserId: 1,
        RestaurantId: 40,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 40,
          name: "Weldon Parker",
          tel: "902-698-6168 x9734",
          address: "3979 Ryan Curve",
          opening_hours: "08:00",
          description:
            "Distinctio ut mollitia nostrum. Consequatur dolores voluptatem amet qui corporis tenetur earum. Omnis repellendus enim.\n \rNeque optio quisquam autem consequatur velit porro. Aliquam iure magni ut earum. Ut recusandae non repudiandae quidem doloribus. Officiis quia suscipit nisi animi autem.\n \rAspernatur molestiae et. Et eum consequuntur. At rerum rerum quaerat culpa dolor. Vel omnis at velit repudiandae. Officiis perspiciatis qui voluptas quis.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=25.659382269167264",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 108,
        text: "Soluta et et.",
        UserId: 1,
        RestaurantId: 8,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 8,
          name: "Louisa Cummerata MD",
          tel: "1-734-755-5111 x47387",
          address: "6622 Johnson Wall",
          opening_hours: "08:00",
          description: "Nostrum magni sit.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=32.944417729082055",
          viewCounts: 15,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-02-21T11:15:43.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 110,
        text: "Fuga natus dolor officia aperiam quis alias.",
        UserId: 1,
        RestaurantId: 10,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 10,
          name: "Eulalia Schoen",
          tel: "301.236.0532",
          address: "5595 Golden Turnpike",
          opening_hours: "08:00",
          description:
            "Aut sequi rerum ad ipsum ea et velit cumque. Qui dolorum recusandae sit voluptas.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=86.12063922584056",
          viewCounts: 2,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-01-09T16:19:05.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 130,
        text: "Necessitatibus dicta sapiente maiores distinctio quos.",
        UserId: 1,
        RestaurantId: 30,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 30,
          name: "Adella Beier",
          tel: "1-783-490-1787 x9508",
          address: "601 Sarina Station",
          opening_hours: "08:00",
          description:
            "Sed harum soluta illo eum commodi numquam. Tempore in tempore eum sunt aperiam cum optio. Debitis eos voluptatem vitae omnis tenetur voluptatem. Praesentium molestias sed aspernatur quo quis et dolore aut accusamus. Necessitatibus cumque blanditiis occaecati similique ex fugiat dolores distinctio.\n \rRem dolorem voluptatem dolor odio officia. Unde totam sed laborum cum. Voluptates et nihil sit ab. Voluptatem dolores nam et velit corporis rerum non reiciendis. Rerum accusamus blanditiis sequi aut asperiores quas quo.\n \rAutem omnis totam ut. Sit sed doloremque impedit quos quia quo illo perferendis. Atque maiores dolor. Debitis officiis est et aut quisquam aut debitis. Eligendi iure ut. Qui quaerat aspernatur corporis saepe omnis repudiandae repudiandae.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=48.463502950499326",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 131,
        text: "Corporis quod aut similique repellendus ipsum enim ipsum.",
        UserId: 1,
        RestaurantId: 31,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 31,
          name: "Elroy Fay",
          tel: "702.175.7764 x4946",
          address: "98347 Reginald Shoal",
          opening_hours: "08:00",
          description: "quidem",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=39.96407087921388",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 135,
        text:
          "Assumenda labore sed facere neque labore eveniet aut distinctio.",
        UserId: 1,
        RestaurantId: 35,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 35,
          name: "Elbert Crooks",
          tel: "(256) 244-1709 x484",
          address: "014 Emilia Islands",
          opening_hours: "08:00",
          description:
            "Ipsa commodi enim tempora veritatis delectus autem ipsam quo qui.\nMinima quis aut non aspernatur.\nSoluta ducimus ipsa dolores ipsam veritatis sit.\nLaboriosam dolore non reprehenderit quibusdam facilis minima ut.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=57.28831374116059",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 140,
        text: "Quis aliquam fugit.",
        UserId: 1,
        RestaurantId: 40,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 40,
          name: "Weldon Parker",
          tel: "902-698-6168 x9734",
          address: "3979 Ryan Curve",
          opening_hours: "08:00",
          description:
            "Distinctio ut mollitia nostrum. Consequatur dolores voluptatem amet qui corporis tenetur earum. Omnis repellendus enim.\n \rNeque optio quisquam autem consequatur velit porro. Aliquam iure magni ut earum. Ut recusandae non repudiandae quidem doloribus. Officiis quia suscipit nisi animi autem.\n \rAspernatur molestiae et. Et eum consequuntur. At rerum rerum quaerat culpa dolor. Vel omnis at velit repudiandae. Officiis perspiciatis qui voluptas quis.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=25.659382269167264",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 143,
        text: "Sunt dolorem mollitia ut.",
        UserId: 1,
        RestaurantId: 43,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 43,
          name: "Maureen Abbott",
          tel: "1-116-713-7053",
          address: "6288 Reva Rapids",
          opening_hours: "08:00",
          description:
            "Excepturi velit recusandae dolorem similique consequatur vero.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=3.077830366186829",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 144,
        text: "Dolorum laboriosam veritatis et porro cumque beatae ducimus.",
        UserId: 1,
        RestaurantId: 44,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 44,
          name: "Rowland Dibbert",
          tel: "(157) 271-3956 x171",
          address: "4603 McKenzie Cove",
          opening_hours: "08:00",
          description:
            "Autem reprehenderit omnis.\nIncidunt aliquid rerum non rem ea et.\nCommodi quia expedita quae est optio qui voluptatem deleniti.\nCum dolore et nihil soluta.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=94.86386729862659",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 147,
        text: "Quam quis earum quia est molestias ut.",
        UserId: 1,
        RestaurantId: 47,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2020-12-15T06:35:43.000Z",
        Restaurant: {
          id: 47,
          name: "Oren Mraz DVM",
          tel: "144-372-2263 x314",
          address: "71871 Adah Via",
          opening_hours: "08:00",
          description: "laudantium",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=5.416043775162582",
          viewCounts: 0,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2020-12-15T06:35:43.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 6562,
        text: "jk dhjl dsl;",
        UserId: 1,
        RestaurantId: 26,
        createdAt: "2020-12-15T16:26:03.000Z",
        updatedAt: "2020-12-15T16:26:03.000Z",
        Restaurant: {
          id: 26,
          name: "Carson Collins",
          tel: "471-440-3141",
          address: "1632 Marietta Summit",
          opening_hours: "08:00",
          description: "aut",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=64.4841358103108",
          viewCounts: 8,
          createdAt: "2020-12-15T06:35:43.000Z",
          updatedAt: "2021-01-10T17:37:30.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 6827,
        text: "很棒的餐廳！",
        UserId: 1,
        RestaurantId: 3247,
        createdAt: "2021-02-19T17:29:26.000Z",
        updatedAt: "2021-02-19T17:29:26.000Z",
        Restaurant: {
          id: 3247,
          name: "L專S賣D",
          tel: "0800666666",
          address: "台北市大安區",
          opening_hours: "04:20",
          description:
            'Lv70以上 / 70級前獲得的技能點數需使用完畢 / 已轉職成為火毒巫師or冰雷巫師or僧侶的角色\r\n1.艾納斯島 / 冰原雪域 / 長老公館 / 找NPC三轉教官對話\r\n2.返回維多利亞島 / 魔法森林 / 圖書館 / 找NPC漢斯對話 , 接受任務得知必須打倒漢斯分身\r\n3.分身在:次元裂縫 巫婆森林II，水晶道路往前直進入異次元世界，發現漢斯分身，限時20分鐘內打倒取得黑符，點選光明水晶回魔法森林，給予漢斯"黑符"，可獲得"力量項鏈"\r\n4.取得力量項鏈，回冰原雪域找法師長老對話，他會要求你接受智慧的考驗\r\n5.帶著黑暗水晶成品到 尖銳的絕壁II右上方 / 雪原聖地最下方 / 找NPC神聖之石。\r\n　點選神聖之石，回答五個問題，全答對可得到"智慧項鍊"，並交回給法師長老即可轉職。\r\n6.完成轉職後獲得一點技能點數，其後每次升級各三點技能點數\r\n■回答錯誤，被黑聖石退出問答，若要再次進行需再交一顆黑暗水晶成品。\r\n■試煉場內沒有商店，進入前請先做好萬全準備。\r\n■LV70~LV120技能點數共151點。',
          image: "https://i.imgur.com/wj6dlqF.jpeg",
          viewCounts: 3,
          createdAt: "2021-02-19T17:26:40.000Z",
          updatedAt: "2021-02-21T14:34:37.000Z",
          CategoryId: 5,
        },
      },
    ],
    FavoritedRestaurants: [
      {
        id: 10,
        name: "Eulalia Schoen",
        tel: "301.236.0532",
        address: "5595 Golden Turnpike",
        opening_hours: "08:00",
        description:
          "Aut sequi rerum ad ipsum ea et velit cumque. Qui dolorum recusandae sit voluptas.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=86.12063922584056",
        viewCounts: 2,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2021-01-09T16:19:05.000Z",
        CategoryId: 4,
        Favorite: {
          UserId: 1,
          RestaurantId: 10,
          createdAt: "2020-12-13T17:39:56.000Z",
          updatedAt: "2020-12-13T17:39:56.000Z",
        },
      },
      {
        id: 12,
        name: "Merl Wolf",
        tel: "1-848-603-6470 x7813",
        address: "0233 Lura Bridge",
        opening_hours: "08:00",
        description: "Facilis aspernatur sint odit deleniti et.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=70.10281112790923",
        viewCounts: 1,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2021-02-19T06:25:53.000Z",
        CategoryId: 5,
        Favorite: {
          UserId: 1,
          RestaurantId: 12,
          createdAt: "2020-12-13T17:40:10.000Z",
          updatedAt: "2020-12-13T17:40:10.000Z",
        },
      },
      {
        id: 26,
        name: "Carson Collins",
        tel: "471-440-3141",
        address: "1632 Marietta Summit",
        opening_hours: "08:00",
        description: "aut",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=64.4841358103108",
        viewCounts: 8,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2021-01-10T17:37:30.000Z",
        CategoryId: 5,
        Favorite: {
          UserId: 1,
          RestaurantId: 26,
          createdAt: "2021-01-08T18:44:40.000Z",
          updatedAt: "2021-01-08T18:44:40.000Z",
        },
      },
      {
        id: 13,
        name: "Arvel Boehm",
        tel: "1-747-219-7889 x2070",
        address: "605 Pouros Terrace",
        opening_hours: "08:00",
        description:
          "Perferendis ut sed velit quaerat voluptatem ea quia. Sequi quia culpa ut officia omnis minus.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=45.572223030594074",
        viewCounts: 7,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2021-02-21T12:59:35.000Z",
        CategoryId: 4,
        Favorite: {
          UserId: 1,
          RestaurantId: 13,
          createdAt: "2021-01-10T15:11:37.000Z",
          updatedAt: "2021-01-10T15:11:37.000Z",
        },
      },
      {
        id: 20,
        name: "Kaleigh Predovic",
        tel: "681-366-1294 x013",
        address: "351 Bonnie Underpass",
        opening_hours: "08:00",
        description: "omnis",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=31.978313952200253",
        viewCounts: 4,
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2021-02-18T13:59:55.000Z",
        CategoryId: 5,
        Favorite: {
          UserId: 1,
          RestaurantId: 20,
          createdAt: "2021-01-24T06:09:04.000Z",
          updatedAt: "2021-01-24T06:09:04.000Z",
        },
      },
      {
        id: 3247,
        name: "L專S賣D",
        tel: "0800666666",
        address: "台北市大安區",
        opening_hours: "04:20",
        description:
          'Lv70以上 / 70級前獲得的技能點數需使用完畢 / 已轉職成為火毒巫師or冰雷巫師or僧侶的角色\r\n1.艾納斯島 / 冰原雪域 / 長老公館 / 找NPC三轉教官對話\r\n2.返回維多利亞島 / 魔法森林 / 圖書館 / 找NPC漢斯對話 , 接受任務得知必須打倒漢斯分身\r\n3.分身在:次元裂縫 巫婆森林II，水晶道路往前直進入異次元世界，發現漢斯分身，限時20分鐘內打倒取得黑符，點選光明水晶回魔法森林，給予漢斯"黑符"，可獲得"力量項鏈"\r\n4.取得力量項鏈，回冰原雪域找法師長老對話，他會要求你接受智慧的考驗\r\n5.帶著黑暗水晶成品到 尖銳的絕壁II右上方 / 雪原聖地最下方 / 找NPC神聖之石。\r\n　點選神聖之石，回答五個問題，全答對可得到"智慧項鍊"，並交回給法師長老即可轉職。\r\n6.完成轉職後獲得一點技能點數，其後每次升級各三點技能點數\r\n■回答錯誤，被黑聖石退出問答，若要再次進行需再交一顆黑暗水晶成品。\r\n■試煉場內沒有商店，進入前請先做好萬全準備。\r\n■LV70~LV120技能點數共151點。',
        image: "https://i.imgur.com/wj6dlqF.jpeg",
        viewCounts: 3,
        createdAt: "2021-02-19T17:26:40.000Z",
        updatedAt: "2021-02-21T14:34:37.000Z",
        CategoryId: 5,
        Favorite: {
          UserId: 1,
          RestaurantId: 3247,
          createdAt: "2021-02-19T17:29:05.000Z",
          updatedAt: "2021-02-19T17:29:05.000Z",
        },
      },
    ],
    Followers: [
      {
        id: 1,
        name: "roo00t",
        email: "root@example.com",
        password:
          "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
        isAdmin: true,
        image: "https://i.imgur.com/3keAGHT.jpeg",
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2021-01-14T16:20:50.000Z",
        Followship: {
          followerId: 1,
          followingId: 1,
          createdAt: "2021-01-05T17:22:26.000Z",
          updatedAt: "2021-01-05T17:22:26.000Z",
        },
      },
    ],
    Followings: [
      {
        id: 1,
        name: "roo00t",
        email: "root@example.com",
        password:
          "$2a$10$jBS/Y4.hceDXkEC5y9ZGne81Y7i5wNwNcy6wAKjNdBykCzlEfWmLm",
        isAdmin: true,
        image: "https://i.imgur.com/3keAGHT.jpeg",
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2021-01-14T16:20:50.000Z",
        Followship: {
          followerId: 1,
          followingId: 1,
          createdAt: "2021-01-05T17:22:26.000Z",
          updatedAt: "2021-01-05T17:22:26.000Z",
        },
      },
      {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
        isAdmin: false,
        image: "https://i.imgur.com/PhcKzNf.jpeg",
        createdAt: "2020-12-15T06:35:43.000Z",
        updatedAt: "2021-01-15T17:07:09.000Z",
        Followship: {
          followerId: 1,
          followingId: 2,
          createdAt: "2021-02-18T13:59:18.000Z",
          updatedAt: "2021-02-18T13:59:18.000Z",
        },
      },
    ],
  },
  isFollowed: true,
};
export default {
  name: "AdminUsers",
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUser();
    this.judgeMainAdmin();
  },
  methods: {
    fetchUser() {
      this.users = dummyData.users.map((user) => ({
        ...user,
        mainAdmin: false,
      }));
    },
    toggleUserRole(id) {
      this.users = this.users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            isAdmin: !user.isAdmin,
          };
        }
        return user;
      });
    },
    judgeMainAdmin() {
      const mainAdminId = dummyUser.profile.id;
      this.users = this.users.map((user) => {
        if (user.id === mainAdminId) {
          return {
            ...user,
            mainAdmin: !user.mainAdmin,
          };
        }
        return user;
      });
    },
  },
};
</script>