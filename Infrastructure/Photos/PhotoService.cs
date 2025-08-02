﻿using Application.Interfaces;
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
			{
				await using var stream = file.OpenReadStream();
				var uploadParams = new ImageUploadParams
				{
					File = new CloudinaryDotNet.FileDescription(file.FileName, stream),
					Transformation = new CloudinaryDotNet.Transformation().Height(500).Width(500).Crop("fill"),
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
