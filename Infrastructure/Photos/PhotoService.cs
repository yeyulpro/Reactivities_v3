using Application.Interfaces;
using Application.Profiles.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Photos
{
	public class PhotoService : IPhotoService
	{
		private readonly Cloudinary _cloudinary;

		public PhotoService(IOptions<CloudinarySettings> config)
		{
			var account = new Account(
				config.Value.CloudName,
				config.Value.ApiKey,
				config.Value.ApiSecret
				);
			_cloudinary = new Cloudinary(account );
		}
		public async Task<string> DeletePhoto(string publicId)
		{  
			var deleteParams = new DeletionParams(publicId);
			var result = await _cloudinary.DestroyAsync(deleteParams);
			if(result.Error != null)
			{
				throw new Exception(result.Error.Message);
			}
			return result.Result;
		}
		public async Task<PhotoUploadResult?> UploadPhoto(IFormFile file)
		{

			if (file.Length > 0)
			{   // await using:  using+async 버전,  사용이 끝나면 자동으로 스트림을 해제: dispose
				await using var stream = file.OpenReadStream();

				var uploadParams = new ImageUploadParams
				{                        // file.FileName: 원래 파일 이름(사용자가 업로드할 때 가지고 있던 이름 cat.png  ei.// string type
					File = new CloudinaryDotNet.FileDescription(file.FileName, stream),//=> 이 파일은 file.FileName이라는 이름을 갖고 있고, 실제 내용은 stream에 들어있다.
					//원래 이름 + 실제 데이터 → 외부 저장소(예: Cloudinary)에 업로드 가능.
					// stream: 해당 파일을 읽을 수 있는 스트림 타입. 이 경우openreadstream으로 만들어서 내용을 메모리에서 직접 읽을 수 있다.
					// 이를 통해서 서버가 파일의 실제 내용을 cloundinary와 같은 외부 서비스로 전송할 수 있다.
					// Transformation = new CloudinaryDotNet.Transformation().Height(500).Width(500).Crop("fill"),
					Folder = "Reactivitys2025"
				};
				var uploadResult = await _cloudinary.UploadAsync(uploadParams);
				if(uploadResult.Error != null)
				{
					throw new Exception(uploadResult.Error.Message);
				}
				return new PhotoUploadResult
				{
					PublicId = uploadResult.PublicId,
					Url = uploadResult.Url.AbsoluteUri
				};
			}
			return null;
		}
	}
}
