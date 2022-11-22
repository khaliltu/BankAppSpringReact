package tn.iit.bank.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.iit.bank.entities.Client;
import tn.iit.bank.repositories.ClientRepository;

@RequiredArgsConstructor
@Service
public class ClientService {

	private final ClientRepository clientRepository;

	public Client save(Client client) {
		Client newClient = Client.builder().cin(client.getCin()).name(client.getName()).lastName(client.getLastName())
				.address(client.getAddress()).build();
		return clientRepository.save(newClient);
	}

	public Client getClientById(String cin) throws Exception {
		return clientRepository.findById(cin).orElseThrow(() -> new Exception("User not found"));
	}
	
	public List<Client> getByNameStartingWith(String prefix) {
		return clientRepository.findByNameStartingWith(prefix);
	}

	public List<Client> getAll() {
		return clientRepository.findAll();
	}

	public boolean exist(String cin) {
		return clientRepository.existsById(cin);
	}

	public void delete(String cin) {
		clientRepository.deleteById(cin);
	}
}
