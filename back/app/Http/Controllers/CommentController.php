<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Comment;
use App\User;
use App\Republic;
use DB;

class CommentController extends Controller
{
      //chama o comando para criar um novo comentario
    // public function createComment(Request $request){
    //   $comment = new Comment;
    //   $comment->createComment($request);
    //
    // return response()->json([$comment]);
    // }


    //remove uma relação entre comentario e Usuario
    public function removeCommentfromUser(Request $request, $id){
      $comment = Comment::find($id);

      if($request->user_id){
        $comment->User_id = null;
      }
      $comment->save();
    return response()->json(['Efetuado com sucesso!']);
    }

    //estabelece uma relação entre comentario, republica e usuario
    public function addRepublicUserintoComment(Request $request, $id, $idU){
      $comment =new Comment();
      $republic=Republic::find($id);
      $user=User::find($idU);
      $comment->createComment($request);
      $current = Carbon::now();
      $comment->republic_id=$republic->id;
      $comment->user_id=$user->id;
      $comment->save();
      $republic->evaluation=DB::table('comments')->where('republic_id',$republic->id)->avg('evaluation');
      $republic->save();
      return $republic;
    return response()->json(['Efetuado com sucesso!']);
    }

    //remove uma relação entre comentario e republica
    public function removeCommentfromRepublic(Request $request, $id){
      $comment = Comment::find($id);

      if($request->republic_id){
        $comment->republic_id = null;
      }
      $comment->save();
    return response()->json(['Efetuado com sucesso!']);
    }
}
