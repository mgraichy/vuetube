<script setup>
    import { computed, inject, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { formatTimeAgo } from '../utils/formatTimeAgo.js';
    const domain = import.meta.env.VITE_DOMAIN;

    const videoArray = inject('videoArray');
    const route = useRoute();
    const router = useRouter();

    const mainVideo = ref(JSON.parse(route.query.vid || '{}'));

    function goToVideo(vid) {
        router.push({
            name: 'watch',
            params: { id: vid.id },
            query: { vid: JSON.stringify(vid) },
        });

        // Update mainVideo without modifying the videoArray:
        mainVideo.value = vid;
    }

    watch(
        () => route.query.vid,
        (newMainVid) => {
            mainVideo.value = JSON.parse(newMainVid);
        }
    );

    const separateSidebarVideos = computed(() => {
        if (videoArray) {
            // Exclude mainVideo from sidebar:
            return videoArray.value.filter(video => video.id !== mainVideo.value.id);
        }
    });
</script>

<template>
    <div v-if="videoArray" class="grid grid-cols-[1fr_.5fr] overflow-y-auto">
        <div class="border-green-400 border-solid border-2">

            <div class="cursor-pointer aspect-video">
                <video class="w-full h-auto" :src="domain + mainVideo.src" type="video/mp4" controls></video>
            </div>
            <div class="flex border-2 border-solid border-green-400">
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil qui repellat illum quidem accusantium quo natus sint omnis illo veritatis officia sit exercitationem vero obcaecati enim unde temporibus nostrum neque maxime reiciendis, beatae laboriosam, tempora aliquam. Saepe omnis minus ipsa inventore ab odit quis. Voluptates ratione corporis blanditiis molestias ad vel vero nulla debitis molestiae assumenda temporibus inventore obcaecati rerum commodi fuga iste enim quo voluptatum minima odit cumque at, quia sunt. Explicabo, accusantium. Corporis quos assumenda iste sapiente cum. Quas asperiores optio est dignissimos! Obcaecati accusamus necessitatibus magni pariatur a adipisci tempora optio beatae exercitationem excepturi. Ex earum quam placeat eveniet dolorem? Ipsa facilis consequuntur ad repellat aliquam quas, ut, impedit adipisci, repellendus odit doloribus ex harum non nulla quasi sed. Neque fugit perspiciatis, rem eos sunt ipsa repudiandae nam iure tempora corrupti deleniti, magni error est ipsam tenetur mollitia alias, similique ab iusto ipsum? Accusantium molestiae magni expedita, pariatur dolore nesciunt iste dolorum! Veritatis consectetur hic quisquam minus fuga, voluptatem deleniti dignissimos inventore quis maiores commodi aliquid minima vero quos. Exercitationem eveniet accusantium iure quis tempora hic quibusdam velit itaque animi ipsam dignissimos temporibus quasi suscipit porro architecto tenetur voluptates doloremque, blanditiis, beatae magni eius. Eveniet sapiente cupiditate animi doloribus maxime. Placeat obcaecati nostrum veritatis autem excepturi harum! Tempora quaerat at maxime quos omnis quod autem, voluptas ipsum assumenda fugit quo veritatis accusantium corporis architecto facilis saepe velit dignissimos sint atque illo suscipit cupiditate repudiandae sapiente commodi. Hic inventore recusandae provident eum doloribus aut, ipsa doloremque iusto sed. Rerum, deserunt? Illo veritatis soluta beatae deleniti quam minima, autem temporibus eligendi eum mollitia doloribus, voluptate possimus ipsa voluptates aut corporis iste earum vitae deserunt id. Ut necessitatibus sunt dolorum autem quidem minus beatae, aperiam fugit voluptates amet enim similique possimus adipisci tempora facilis recusandae, rerum quaerat deleniti cum reiciendis totam? Voluptatem inventore nihil ipsam ut animi reprehenderit similique cum officia numquam consequatur, quae deserunt omnis. Doloremque porro magni consectetur, sit praesentium soluta natus corrupti unde cum fuga ducimus reiciendis laudantium ipsum perferendis similique beatae laborum odit hic dolorum et quas accusantium incidunt error! Ipsa, iste vitae eos cum molestias et maiores consectetur nam enim ad distinctio quas, veniam sit labore dolor quidem similique, minima quam reiciendis omnis! Consectetur blanditiis cumque a eius dolorem debitis veritatis porro tenetur quos saepe totam, ut iusto enim voluptatibus! Ad illum, maiores architecto delectus, vitae odio rem quasi officia illo impedit maxime incidunt ab nam quam iste placeat dolores sequi corporis id repellat consectetur quod adipisci. Eligendi, non in magnam inventore nesciunt blanditiis consequatur error amet quibusdam accusantium facilis voluptatibus modi fugit pariatur. Atque sapiente error quae architecto qui libero necessitatibus commodi. Veniam sed numquam impedit maiores sint, iste suscipit deleniti, quam consequatur reiciendis tenetur soluta temporibus cum eaque dolores, adipisci expedita fugit. Beatae, atque aut fugiat deserunt aliquam vitae id alias non! Autem facere fuga reiciendis id odit asperiores cum ipsum repudiandae labore omnis harum quas numquam, consequuntur provident dolores necessitatibus nisi ipsam quod quisquam architecto illum tenetur veniam. Corrupti reprehenderit, et magnam at animi dicta impedit totam maiores, nulla dolore architecto adipisci omnis neque, molestias reiciendis similique aliquam ipsa in delectus tenetur! Voluptate ab harum hic nostrum vitae voluptatibus incidunt architecto dolor natus quisquam nulla beatae unde reiciendis, nisi ratione saepe libero ea earum facere eligendi magni omnis cupiditate vel? Omnis harum, quaerat est ratione id quam nam itaque, similique fugiat, voluptatum expedita aut inventore doloribus ipsam dolore modi consequatur dignissimos totam vero aliquam beatae unde voluptas deleniti! Blanditiis inventore molestiae veritatis aspernatur vero impedit aliquid, dolores dicta eaque autem! In iste laudantium illum voluptatem cumque, quos consequatur laborum, error suscipit commodi maiores voluptatibus blanditiis inventore incidunt consequuntur reprehenderit? Voluptates atque, cum nulla provident culpa dignissimos explicabo! Amet eveniet quibusdam, earum illum dicta dolore quae tempore aspernatur possimus dolores obcaecati et iusto at, nulla praesentium reprehenderit consequatur molestiae porro error modi! Exercitationem, consectetur vero. Hic dolorum fugit dolorem nesciunt nostrum iusto nulla maiores nam dolor dolores quisquam eius ut minima provident inventore exercitationem qui, eos magnam expedita dignissimos fuga a consectetur repellendus laudantium. Sit quas illo praesentium esse itaque, dignissimos optio dolores quo consequatur quis enim minus ratione ut tenetur aut nemo repellat incidunt eum suscipit maiores iste tempore. Culpa unde accusamus qui porro molestiae minus, dolorem, repudiandae maxime itaque perferendis eos quidem. Voluptatibus, commodi tenetur! Quis architecto totam natus soluta, voluptatem dolorem? Eius, nesciunt, perferendis ratione, maxime tempore iure labore sequi sit corporis quod aperiam temporibus fugiat dolorum! Aut nesciunt ullam vero officiis distinctio consequatur dolorem amet blanditiis provident. Animi aliquid, magnam corrupti voluptatibus eius vero! Omnis unde repellendus placeat mollitia cumque, labore impedit nemo ad quis porro officiis reiciendis nesciunt ex sed nihil tempora excepturi nisi praesentium eos, commodi natus suscipit iusto recusandae! Quod itaque laboriosam aspernatur veniam omnis ut nam animi eveniet neque illo ad dolorem expedita recusandae ducimus dolor officiis soluta, tenetur reprehenderit asperiores doloremque harum laudantium eos? Corrupti labore ex id cupiditate obcaecati est ducimus soluta facilis, provident eius magni eaque perspiciatis porro tenetur necessitatibus repellat fugit, corporis harum numquam dolor veniam cumque. Incidunt aliquam, dolores cum, voluptatem libero eius minus dolorem laborum exercitationem laudantium animi fugiat assumenda facilis atque voluptate quas ex officiis porro inventore iste commodi voluptas doloribus velit. Ullam qui molestiae odio obcaecati. Nam magni laborum ab tempora cum cumque aut id modi ipsa, ullam quidem fugiat asperiores veniam corporis est exercitationem nesciunt animi. Blanditiis ea quas maiores nulla voluptatibus, corporis rerum ut ex tempora libero labore commodi, cumque culpa dolore laudantium sapiente esse voluptate, placeat itaque in quasi illo animi temporibus maxime. A corporis enim voluptates dolorum nemo, quia eos sunt amet? Vitae sed doloribus cupiditate aut explicabo qui nisi omnis quidem nesciunt consectetur. Nobis perferendis voluptatum, accusantium reiciendis esse aliquid ut architecto, illo recusandae tempora facere nostrum illum magni quis? Itaque optio saepe aut odio maxime ab cum deleniti dicta sit, eaque corporis, deserunt debitis aspernatur. Assumenda cum reiciendis, quos ad eveniet natus dolores eaque consequatur harum, iste consequuntur sit qui officia maxime recusandae? Magni rerum facilis repellendus. Id cum necessitatibus consectetur!</div>
            </div>
            <div class="flex border-2 border-solid border-green-400">
                <div>HEY</div>
            </div>
            <div class="flex border-2 border-solid border-green-400">
                <div>HEY</div>
            </div>

        </div>

        <div id="right-sidebar" class="ml-2 border-yellow-400 border-solid border-2">

            <div
                v-for="(vid, index) in separateSidebarVideos"
                :key="index"
                @click="goToVideo(vid)"
                class="grid grid-cols-[16fr_9fr] cursor-pointer border-purple-800 border-solid border-2"
            >
                <div class="aspect-video mb-2 border-red-400 border-solid border-2">
                    <video class="max-w-full h-auto rounded" :src="domain + vid.src" type="video/mp4"></video>
                </div>

                <div class="flex flex-col border-green-400 border-solid border-2">
                    <div class="text-[15px] font-extrabold w-full cursor-pointer">{{ vid.title }}</div>
                    <div class="text-[12px] pb-0.5 w-full text-gray-300 font-extrabold cursor-pointer">{{ vid.name }}</div>
                    <div class="text-xs mb-1 w-full text-gray-300 cursor-pointer">{{ vid.views }} views • {{ formatTimeAgo(new Date(vid.date)) }}</div>
                </div>
            </div>

        </div>

    </div>

</template>

