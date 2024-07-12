using AlertManager.BusinessLogic.Models;
using Microsoft.Data.SqlClient;

namespace AlertManager.Users
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string connectionString = "Data Source=LAPTUF\\SQLEXPRESS;Initial Catalog=AlertManager;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False";

            var users = new[]
            {
                new User { Name = "Sebastian", Email = "sk@mbank.pl" },
                new User { Name = "Agnieszka", Email = "an@mbank.pl" }
            };

            users[0].SetPassword("pass1");
            users[1].SetPassword("pass2");


            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                foreach (var user in users)
                {
                    using (var command = new SqlCommand("INSERT INTO Users (name, email, password) VALUES (@Name, @Email, @Password)", connection))
                    {
                        command.Parameters.AddWithValue("@Name", user.Name);
                        command.Parameters.AddWithValue("@Email", user.Email);
                        command.Parameters.AddWithValue("@Password", user.Password);

                        command.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
