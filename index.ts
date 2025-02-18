import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {typeDefs} from './schema.ts';
import data from './data.ts';


const resolvers = {
    Query:{
        games(){
            return data.games
        },
        reviews(){
            return data.reviews
        },
        authors(){
            return data.authors
        },
        review(_,args){
            return data.reviews.find((review)=>review.id===args.id);
        },
        game(_,args){
            return data.games.find((game)=>game.id===args.id);
        },
        author(_,args){
            return data.authors.find((author)=>author.id===args.id);
        }
    },
    Game:{
        reviews(parent){
            return data.reviews.filter((r)=>r.game_id===parent.id);
        }
    },
    Author:{
        reviews(parent){
            return data.reviews.filter((r)=>r.author_id==parent.id);
        }
    },
    Review:{
        author(parent){
            return data.authors.find((a)=>a.id===parent.author_id)
        },
        game(parent){
            return data.games.find((a)=>a.id===parent.author_id)
        }
    },
    Mutation:{
        deleteGame(_,args){
            data.games=data.games.filter((g)=>g.id!==args.id)
            return data.games;
        },
        addGame(_,args){
            let game = {
                ...args.game,
                id:Math.floor(Math.random()*1000)
            }
            data.games.push(game);
            return game
        },
        updateGame(_,args){
            data.games.map((g)=>{
                if(g.id===args.id){
                    return{
                        ...g,...args.edits
                    }
                }
                return g
            });
            return data.games.find((g)=>g.id ===args.id);
        }
    }
}

export const app = new ApolloServer({typeDefs,resolvers});

const {url} = await startStandaloneServer(app,{listen:{port:3000}});
console.log('Server ready at port 3000');