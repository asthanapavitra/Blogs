import express from "express"
import bodyParser from "body-parser";

const app= express();
const port=3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs",{ posts: posts } );
});

app.get("/compose.ejs", (req,res)=>{
    res.render("compose.ejs");
});

app.post("/submitted.ejs", (req,res)=>{
    var title= req.body.title;
    var content=(req.body.content);console.log(title + "/n"+content);
    var post= {id:posts[posts.length-1].id+1, title,content}
    
    posts.push(post);
    console.log(posts[posts.length-1]);
    res.render("submitted.ejs");
});

app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id == postId);
    if (post) {
        res.render('edit.ejs', { post: post });
    } else {
        res.redirect('/');
    }
});

app.post('/update/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPost = {
        id: postId,
        title: req.body.title,
        content: req.body.content
    };
    const postIndex = posts.findIndex(p => p.id == postId);
    if (postIndex !== -1) {
        posts[postIndex] = updatedPost;
        res.redirect('/');
    } else {
        res.redirect('/edit/' + postId);
    }
});
app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(p => p.id != postId);
    res.redirect('/');
    // alert("Your post has been deleted");
});
app.listen(port, ()=>{
    console.log("Server running on port "+ port);
});

let posts=[
    {id:1,
    image:"https://akashgautam.com/wp-content/uploads/2018/01/how-to-meditate-and-increase-mindfulness-e1517315987769.png",
    title:"How To Meditate & Increase Mindfulness ?",
    content:"How to meditate, increase mindfulness & find God’ is not my Blog or writing. My intellect is too small to even begin to answer this most profound question like the saints who walked this country did. They gave to this world the real meaning of spirituality and the precise understanding of mindfulness, who is God and how to find God through meditation. This blog is their message, their words, their writing. I feel immensely blessed to be their very small instrument as I amplify their message further. This blog is also my very personal spiritual story: the story of my learning on the most beautiful road of spirituality (Not religion). This blog is long but a comprehensive guide to the above question (I promise). You will need 2-3 readings to fully absorb everything that’s written here. So, be slow and thorough to get the most out of it."

    },
    {
        id:2,
        image:"https://akashgautam.com/wp-content/uploads/2019/01/how-to-raise-emotional-quotient-e1547661925561.jpg",
        title:"6 Super Smart Ways To Raise Your Emotional Quotient",
        content:"If you google Emotional Quotient (EQ), the search engine giant will throw some very sophisticated, ‘padha likha’ definitions at you. Might just end up challenging your IQ as well. Don’t even get into all that. There might be many complicated things in life; understanding and figuring out simple, doable & smart ways to raise your emotional quotient should not be one of those headaches. Simply put, EQ is your ability to handle all the shit life throws at you, without losing your own calm and composure. Emotions are what makes us human (although there are pets in some homes who display more truer emotions these days than the owners). The word ‘Emotion’ stands for ‘Energy in Motion’ :-Hence there lies huge value in staying truthful about your emotions and using your mind and emotions in your favor and not against your own self "
    },
    {
        id:3,
        image:"https://akashgautam.com/wp-content/uploads/2018/11/how-to-find-your-passion.png",
        title:"How To Find Your Passion & Create A Super Career Out Of It",
        content:"Are you someone who has often grappled with the question – ‘What am I good at?’ or rather wondered, ‘Am I good at anything at all!’; then this blogpost on ‘How to find your passion’ is for you. And if you are one of those lucky souls who have always known what to do with their lives, I am sure you know ample people who are still struggling. Pass it on to them."
    }
    ,
    {
        id:4,
        image:"https://akashgautam.com/wp-content/uploads/2018/11/how-to-start-a-blog-make-it-very-popular.png",
        title:"How To Start A Blog And Make It Very Popular",
        content:"The first time I posted a blog was 4th November, 2010. I wrote ‘How to smartly choose a career’ because it was one of the questions I was asked, very frequently. No one noticed my first blogpost. With a hurt ego & in desperation, I had to finally call up a few friends & relatives and requested them to please for heaven’s sake have a look. Today after posting hundreds of Blogposts (with some of them even having 2.5 million plus unique views)- I so want to share my secret of ‘ How to start a Blog’ & ‘How to make it very popular’. It is a long post, but I promise you – it contains all that you need to know to ‘How to become a Star Blogger’."
    }

]
